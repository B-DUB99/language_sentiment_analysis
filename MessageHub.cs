using Microsoft.AspNetCore.SignalR;

namespace LanguageSentimentAnalysis
{
    public class MessageHub : Hub
    {
        public async Task RecieveText(string text)
        {
            // TODO: pass the text into our model, and get the result

            double randomNum = new Random().NextDouble() * 2 - 1;

            var result = new
            {
                value = randomNum
            };

            await Clients.Caller.SendAsync("ReceiveSentiment", result);
        }
    }
}
