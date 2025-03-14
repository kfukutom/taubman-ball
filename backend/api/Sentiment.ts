const runSentiment = async (text: string): Promise<string> => {
    try {
      const res = await fetch("/api/sentiment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });
  
      if (!res.ok) {
        throw new Error(`Failed to analyze sentiment: ${res.statusText}`);
      }
  
      const data = await res.json();
      return data.sentiment;
    } catch (error) {
      console.error("Sentiment analysis failed:", error);
      return "0.5";
    }
  }; // runSentiment()
  
  export default runSentiment;