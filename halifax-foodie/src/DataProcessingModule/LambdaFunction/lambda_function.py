import boto3
import json
import base64
from wordcloud import WordCloud
import io


def lambda_handler(event, context):
    s3 = boto3.client("s3")
    bucket = "serverlessprojectfeedback"
    key = "sampleFeedbacks.txt"
    file = s3.get_object(Bucket=bucket, Key=key)
    paragraph = str(file['Body'].read())

    comprehend = boto3.client("comprehend")

    # Extracting sentiments using comprehend
    entitiesJson = json.loads(json.dumps(comprehend.detect_entities(Text=paragraph, LanguageCode='en')))
    print(len(entitiesJson["Entities"]))
    print(entitiesJson["Entities"][0]["Text"])
    finalStr = ""
    for i in range(0, len(entitiesJson["Entities"])):
        finalStr += entitiesJson["Entities"][i]["Text"]
        finalStr += " "


    wordcloud = WordCloud(width=800, height=800,
                          background_color='white',
                          min_font_size=10).generate(finalStr).to_image()

    print(type(wordcloud))
    # wordcloud.tobytes()
    print(type(wordcloud))


    byteIO = io.BytesIO()
    wordcloud.save(byteIO, format='PNG')
    byteArr = byteIO.getvalue()
    # plt.savefig("mygraph.png")


    return {
        'headers': {"Content-Type": "image/png"},
        'statusCode': 200,
        'body': base64.b64encode(byteArr).decode('utf-8'),
        'isBase64Encoded': True
    }

