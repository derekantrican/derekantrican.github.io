using Newtonsoft.Json;

if (args.Length < 1 || string.IsNullOrEmpty(args[0]))
{
    Console.WriteLine($"Run with 'dotnet run [BLOGGER_API_KEY]'");
    return;
}

string bloggerApiKey = args[0];
string blogId = "6579172708874039817";
string serializeFile = @"..\..\public\blogs\pct.json";
List<BlogPost> posts = new List<BlogPost>();

using (HttpClient client = new HttpClient())
{
    string pageToken = "";
    while (pageToken != null)
    {
        HttpResponseMessage response = await client.GetAsync($"https://www.googleapis.com/blogger/v3/blogs/{blogId}/posts?key={bloggerApiKey}{(!string.IsNullOrEmpty(pageToken) ? $"&pageToken={pageToken}" : "")}");
        response.EnsureSuccessStatusCode();
        string responseContent = await response.Content.ReadAsStringAsync();
        BloggerResponse bloggerResponse = JsonConvert.DeserializeObject<BloggerResponse>(responseContent);
        posts.AddRange(bloggerResponse.Items);
        Console.WriteLine($"Got {bloggerResponse.Items.Count} items. Next page token is {bloggerResponse.NextPageToken}");
        pageToken = bloggerResponse.NextPageToken;
    }
}

File.WriteAllText(serializeFile, JsonConvert.SerializeObject(posts, Formatting.Indented));

class BloggerResponse
{
    public string NextPageToken { get; set; }
    public List<BlogPost> Items { get; set; }
}

class BlogPost
{
    public string Id { get; set; }
    public DateTime Published { get; set; }
    public string Url { get; set; }
    public string Title { get; set; }
    public string Content { get; set; }
    public List<string> Labels { get; set; } = new List<string>();
}