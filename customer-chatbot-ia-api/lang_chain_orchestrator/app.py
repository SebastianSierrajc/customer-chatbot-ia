from langchain.llms.sagemaker_endpoint import LLMContentHandler
from kendra_index_retriever import KendraIndexRetriever
from langchain.prompts import PromptTemplate
from langchain.chains import RetrievalQA
from langchain import OpenAI, SagemakerEndpoint
import os
import json

class ContentHandler(LLMContentHandler):
    content_type = "application/json"
    accepts = "application/json"

    def transform_input(self, prompt: str, model_kwargs: dict) -> bytes:
        input_str = json.dumps({"text_inputs": prompt, **model_kwargs})
        return input_str.encode('utf-8')
    
    def transform_output(self, output: bytes) -> str:
        response_json = json.loads(output.read().decode("utf-8"))
        return response_json["generated_texts"][0]

def build_chain():
    region = os.environ["AWS_REGION"]
    kendra_index_id = os.environ["KENDRA_INDEX_ID"]
    endpoint_name = os.environ["FLAN_XL_ENDPOINT"]

    if endpoint_name != "":
        print("using sagemaker endpoint")
        content_handler = ContentHandler()
        llm=SagemakerEndpoint(
            endpoint_name=endpoint_name, 
            region_name=region, 
            model_kwargs={"temperature":0.2, "max_length": 500},
            content_handler=content_handler
        )
    else:
        llm = OpenAI(batch_size=5, temperature=0, max_tokens=400)

    retriever = KendraIndexRetriever(kendraindex=kendra_index_id, 
        awsregion=region, 
        return_source_documents=True)

    prompt_template = """
    Eres un asistente virtual para un ecommerce que responde preguntas frecuentes a los clientes, 
    eres conversador y respondes a las preguntas de los clientes de forma detallada y amable.

    Este es el contexto para formular las respuestas:
        
        {context}

    Accion: utilizando en el contexto, responde de forma detallada a: {question}.
    Respuesta:
    """
    PROMPT = PromptTemplate(
        template=prompt_template, input_variables=["context", "question"]
    )
    
    chain_type_kwargs = {"prompt": PROMPT}
    
    return RetrievalQA.from_chain_type(
        llm, 
        chain_type="stuff", 
        retriever=retriever, 
        chain_type_kwargs=chain_type_kwargs, 
        return_source_documents=True
    )

def run_chain(chain, prompt: str, history=[]):
    result = chain(prompt)
    # To make it compatible with chat samples
    return {
        "answer": result['result'],
        "source_documents": result['source_documents']
    }


def lambda_handler(event, context):
    # Check if query is provided in event or in body of request
    # If both are provided, body takes precedence.
    if 'query' in event:
        query = event['query']
    elif 'body' in event:
        query = json.loads(event['body'])['query']
    else:
        return {
            "statusCode": 400,
            "body": json.dumps({
                "error": "No query provided"
            }),
        }
    chain = build_chain()
    result = run_chain(chain, query)
    return {
        "statusCode": 200,
        "headers": {
        "Access-Control-Allow-Headers" : "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST"},
        "body": json.dumps({
            "answer": result['answer'],
        }),
    }
