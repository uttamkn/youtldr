# YouTLDR - AI-Powered YouTube Video Summarization

YouTLDR is a web application that leverages AI agents to generate concise and accurate summaries of YouTube videos. Built with cutting-edge technologies, this project simplifies content consumption by providing easy access to video summaries tailored to each user's needs.

## Features

1. **Authentication**  
   - Secure authentication set up using [Nhost's backend service](https://nhost.io/).

2. **Automated Workflow**  
   - Designed and implemented a full workflow using [n8n](https://n8n.io/), enabling seamless backend processes.

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

8. **Responsive UI**  
   - Developed a user-friendly, responsive interface using the Bolt design framework.

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
- **Database:** User-specific data management via Hasura actions

GitHub: [uttamkn/YouTLDR](https://github.com/uttamkn/YouTLDR)
