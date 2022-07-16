# arcanys-quiz

## Istall Docker
Docker is required to be installed in your current machine.
```bash
docker-compose up -d
```
Type "docker-compose up -d" to run the project and wait for docker to install and run things in the background.
And type "docker-compose down" to shutdown the running docker container.

Use postman to test the API.

## Available Endpoints:

1. HTTP METHOD: POST
URL: localhost:8081/expose-api/sign-up
payload: { "email": "", password: "" }

After you sign up, it will respond a url email. That email contains an href link to verify account, and you can also call it in postman.

2. HTTP METHOD: GET
Just in case: URL: localhost:8081/expose-api/verify/:accountId/:verification_Code

If something's not working on the email, just generate an account on https://ethereal.email/, and update ACCOUNT_EMAIL and ACCOUNT_PASSWORD in .env file


After verifying, you may now sign in

3. HTTP METHOD: POST
URL: localhost:8081/expose-api/sign-in
payload: {"email":"", "password":""}

API Response will contain a token. And always attach it to "Authorization" Header to be able to make a request on the quiz api.



URL: localhost8081/api/quizzes/
4. LIST OF QUIZ - HTTP METHOD: GET
5. ADD QUIZ - HTTP METHOD: POST

# Sample Payload

{
    "title": "quiz title",
    "questions": [
        {
            "type": 1,
            "text_display": "What is the capital of the PH?",
            "answer_choices": [
                {
                    "text_display": "Manila",
                    "is_correct_answer": true
                },
                {
                    "text_display": "Makati",
                    "is_correct_answer": false
                },
                {
                    "text_display": "Quezon City",
                    "is_correct_answer": false
                }
            ]
        }
    ]
}