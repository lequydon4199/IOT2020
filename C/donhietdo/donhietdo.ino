#include <Wire.h>
#include <Adafruit_MLX90614.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>

Adafruit_MLX90614 mlx = Adafruit_MLX90614();
const char* ssid = "bullshit";
const char* password = "tumotdenchin";
const char* server = "http://192.168.137.101:5000/logs";

void setup() {
  Serial.begin(9600);
  mlx.begin();
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED)
  {
    delay(1000);
    Serial.println("Connecting wifi ...");
  }

  Serial.print("Connected, IP address: ");
  Serial.println(WiFi.localIP());
}

void loop() {

  if (WiFi.status() == WL_CONNECTED) {
    StaticJsonBuffer<300> JSONbuffer;   //Declaring static JSON buffer
    JsonObject& JSONencoder = JSONbuffer.createObject();

    JSONencoder["temperature_object"] = mlx.readObjectTempC();
    JSONencoder["temperature_ambient"] = mlx.readAmbientTempC();
    char JSONmessageBuffer[300];
    JSONencoder.prettyPrintTo(JSONmessageBuffer, sizeof(JSONmessageBuffer));

    HTTPClient http; //Object of class HTTPClient
    http.begin(server);
    http.addHeader("Content-Type", "application/json");  //Specify content-type header

    //Serial.println("POST TO SERVER ...");
    Serial.print("Ambient = "); Serial.print(mlx.readAmbientTempC()); 
    Serial.print("*C\tObject = "); Serial.print(mlx.readObjectTempC()); Serial.println("*C");
    int httpCode = http.POST(JSONmessageBuffer);   //Send the request
    String payload = http.getString();  
    //Serial.print("SERVER RESPOSNE CODE: ");Serial.println(httpCode);

  } else {
    Serial.println("Disconnect Wifi ...");
  }

  Serial.println();
  delay(1000);
}
