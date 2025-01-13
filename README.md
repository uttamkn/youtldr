# YouTLDR - Get TL;DR for Any YouTube Video.

YouTLDR is a web application that uses AI agents to generate concise and accurate summaries of YouTube videos.

## Features

1. **Authentication**  
   - Secure authentication using [Nhost's backend service](https://nhost.io/).

2. **Automated Workflow**  
   - Designed and implemented a full workflow using [n8n](https://n8n.io/).
     ![image](https://github.com/user-attachments/assets/7cdb8a14-43e2-4c6e-9cf7-c0bf87090edb)


3. **AI Summarization**  
   - Integrated the OpenRouter node within the n8n workflow to fetch summaries using the free Gemini model.

4. **Frontend Integration**  
   - Connected the n8n workflow to the frontend via Nhost using Hasura actions for real-time data synchronization.

5. **User-Specific Database**  
   - Summaries are stored in a user-specific database for quick access and retrieval.

6. **Efficient Caching**  
   - Implemented URL caching with Hasura to prevent unnecessary API calls for repeated requests.

7. **Error Handling**  
   - Comprehensive error handling for almost all possible scenarios, ensuring a smooth user experience.

## Heads Up

1. **AI Model Usage Limits**  
   - The n8n workflow utilizes the free Gemini model, which comes with a usage limit.

2. **YouTube Transcript API Limits**  
   - The YouTube transcript API also has certain restrictions on usage.

3. **Debugging Support**  
   - If any API issues arise, detailed error messages are provided.

## Technologies Used

- **Frontend:** Nextjs 
- **Backend:** Nhost, Hasura, and n8n
- **AI:** OpenRouter (Gemini model)
- **Database:** User-specific data management via Hasura actions (graphql)

GitHub: [uttamkn/YouTLDR](https://github.com/uttamkn/YouTLDR)
