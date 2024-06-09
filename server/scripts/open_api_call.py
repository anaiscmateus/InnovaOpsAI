import sys
import json
from dotenv import load_dotenv
from openai import OpenAI
import os

# Load environment variables from .env file
load_dotenv()
ft_model = os.getenv('MODEL')

def main():
    # Initialize OpenAI client
    client = OpenAI()

    input_data = sys.stdin.read()
    request = json.loads(input_data)

    # Use the custom model identifier
    model = ft_model
    messages = request.get('messages')

    try:
        response = client.chat.completions.create(
            model=model,
            messages=messages
        )
        # Properly access the content attribute of the message
        message_content = response.choices[0].message.content
        print(json.dumps({"message": message_content}))
    except Exception as e:
        print(json.dumps({'error': str(e)}), file=sys.stderr)

if __name__ == "__main__":
    main()
