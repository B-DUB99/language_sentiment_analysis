using Microsoft.AspNetCore.SignalR;
using static LanguageSentimentAnalysis.MLModel;

namespace LanguageSentimentAnalysis
{
    public class MessageHub : Hub
    {
        public async Task RecieveText(string text)
        {
            ModelInput data = new ModelInput()
            {
                ReviewText = text
            };

            var prediction = MLModel.Predict(data);

            var result = new
            {
                score = prediction.Score
            };
      
            await Clients.Caller.SendAsync("ReceiveSentiment", result);
        }
    }
}
