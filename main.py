import uvicorn
import os
from fastapi import FastAPI, HTTPException
from google import generativeai as genai
from google.generativeai.types import GenerationConfig
from dotenv import load_dotenv
from pydantic import BaseModel

class PromptRequest(BaseModel):
    prompt: str

app = FastAPI()

load_dotenv()

genai.configure(api_key=os.getenv("API_KEY"))

def gemini_response(prompt):
    model = genai.GenerativeModel(os.getenv('GENERATION_MODEL'))
    response = model.generate_content(
        prompt,
        generation_config=GenerationConfig(
            max_output_tokens=100,
            temperature=0.5,
        )
    )
    return response.text

@app.post('/api/v1/analyze')
def analyze(request: PromptRequest):
    try:
        response = gemini_response(request.prompt)
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f'Erro: {e}')


if __name__ == '__main__':
    uvicorn.run(app=app, host='localhost', port=8000)