/*********************************************************************************************************
*
* File                : DustSensor
* Hardware Environment: 
* Build Environment   : Arduino
* Version             : V1.0.5-r2
* By                  : WaveShare
*
*                                  (c) Copyright 2005-2011, WaveShare
*                                       http://www.waveshare.net
*                                       http://www.waveshare.com   
*                                          All Rights Reserved
*
*********************************************************************************************************/
/*************************************************** 
  This is a library for the Si1145 UV/IR/Visible Light Sensor

  Designed specifically to work with the Si1145 sensor in the
  adafruit shop
  ----> https://www.adafruit.com/products/1777

  These sensors use I2C to communicate, 2 pins are required to  
  interface
  Adafruit invests time and resources providing this open source code, 
  please support Adafruit and open-source hardware by purchasing 
  products from Adafruit!

  Written by Limor Fried/Ladyada for Adafruit Industries.  
  BSD license, all text above must be included in any redistribution
 ****************************************************/
 
// Example testing sketch for various DHT humidity/temperature sensors
// Written by ladyada, public domain

// REQUIRES the following Arduino libraries:
// - DHT Sensor Library: https://github.com/adafruit/DHT-sensor-library
// - Adafruit Unified Sensor Lib: https://github.com/adafruit/Adafruit_Sensor
#include "DHT.h"
#include <Wire.h>
#include "Adafruit_SI1145.h"

Adafruit_SI1145 uv = Adafruit_SI1145(); // UV variable

#define DHTPIN 2     // Digital pin connected to the DHT sensor
// Feather HUZZAH ESP8266 note: use pins 3, 4, 5, 12, 13 or 14 --
// Pin 15 can work but DHT must be disconnected during program upload.

// Uncomment whatever type you're using!
#define DHTTYPE DHT11   // DHT 11
//#define DHTTYPE DHT22   // DHT 22  (AM2302), AM2321
//#define DHTTYPE DHT21   // DHT 21 (AM2301)

// Connect pin 1 (on the left) of the sensor to +5V
// NOTE: If using a board with 3.3V logic like an Arduino Due connect pin 1
// to 3.3V instead of 5V!
// Connect pin 2 of the sensor to whatever your DHTPIN is
// Connect pin 4 (on the right) of the sensor to GROUND
// Connect a 10K resistor from pin 2 (data) to pin 1 (power) of the sensor

// Initialize DHT sensor.
// Note that older versions of this library took an optional third parameter to
// tweak the timings for faster processors.  This parameter is no longer needed
// as the current DHT reading algorithm adjusts itself to work on faster procs.

 
DHT dht(DHTPIN, DHTTYPE);

// Dust sensor variables
#define        COV_RATIO                       0.2            //ug/mmm / mv
#define        NO_DUST_VOLTAGE                 400            //mv
#define        SYS_VOLTAGE                     5000       
/*
I/O define
*/
const int iled = 7;                                            //drive the led of sensor
const int vout = 0;                                            //analog input

/*
variable
*/
float density, voltage;
int   adcvalue;


/*
private function for the dust sensor
*/
int Filter(int m)
{
  static int flag_first = 0, _buff[10], sum;
  const int _buff_max = 10;
  int i;
  
  if(flag_first == 0)
  {
    flag_first = 1;

    for(i = 0, sum = 0; i < _buff_max; i++)
    {
      _buff[i] = m;
      sum += _buff[i];
    }
    return m;
  }
  else
  {
    sum -= _buff[0];
    for(i = 0; i < (_buff_max - 1); i++)
    {
      _buff[i] = _buff[i + 1];
    }
    _buff[9] = m;
    sum += _buff[9];
    
    i = sum / 10.0;
    return i;
  }
}

// Gas Sensor Variables
int sensorValue;

void setup() {
  // put your setup code here, to run once:

  // Dust Sensor
  pinMode(iled, OUTPUT);
  digitalWrite(iled, LOW);                                     //iled default closed
  
  Serial.begin(115200);        //send and receive at 9600 baud
 
  dht.begin(); // dht sensor

}

void loop() {
  // put your main code here, to run repeatedly:
 // Wait a few seconds between measurements.
  delay(2000);
  
  // Dust Sensor
  /*
  get adcvalue
  */
  digitalWrite(iled, HIGH);
  delayMicroseconds(280);
  adcvalue = analogRead(vout);
  digitalWrite(iled, LOW);
  
  adcvalue = Filter(adcvalue);
  
  /*
  covert voltage (mv)
  */
  voltage = (SYS_VOLTAGE / 1024.0) * adcvalue * 11;
  
  /*
  voltage to density
  */
  if(voltage >= NO_DUST_VOLTAGE)
  {
    voltage -= NO_DUST_VOLTAGE;
    
    density = voltage * COV_RATIO;
  }
  else
    density = 0;
    
  /*
  display the result of all the weaterh conditions which will include all the sensors
  */
  //Serial.print("The current dust concentration is: ");
  Serial.print("d:");
  Serial.print(density);
  Serial.print(" ug/m3\n");  
 
  //delay(1000);

  sensorValue = analogRead(1);       // read analog input pin 1
 // Serial.print("The current gas sensing is: ");
 Serial.print("g:");
  Serial.println(sensorValue, DEC);  // prints the value read


// DHT code
   // Reading temperature or humidity takes about 250 milliseconds!
  // Sensor readings may also be up to 2 seconds 'old' (its a very slow sensor)
  float h = dht.readHumidity();
  // Read temperature as Celsius (the default)
  float t = dht.readTemperature();
  // Read temperature as Fahrenheit (isFahrenheit = true)
  float f = dht.readTemperature(true);

  // Check if any reads failed and exit early (to try again).
  if (isnan(h) || isnan(t) || isnan(f)) {
    Serial.println(F("Failed to read from DHT sensor!"));
    return;
  }

  // Compute heat index in Fahrenheit (the default)
  float hif = dht.computeHeatIndex(f, h);
  // Compute heat index in Celsius (isFahreheit = false)
  float hic = dht.computeHeatIndex(t, h, false);

  //Serial.print(F("Humidity: "));
  Serial.print(F("H:"));
  Serial.println(h);
  
  //Serial.print(F("%  Temperature: "));
  Serial.print(F("t:"));
  Serial.println(t);
  
  //Serial.print(F("C:"));
 // Serial.print(f);
  
  //Serial.print(F("°F  Heat index: "));
  Serial.print(F("I:"));
  Serial.println(hic);
  
 // Serial.print(F("°C "));
 
 //Serial.print(F("C:"));
//  Serial.print(hif);
//  Serial.println(F("°F"));

  //Serial.print("Vis: "); Serial.print(uv.readVisible());
  //Serial.print(" IR: "); Serial.print(uv.readIR());
  Serial.print("V:"); Serial.println(uv.readVisible());
  Serial.print("R:"); Serial.println(uv.readIR());
  
  // Uncomment if you have an IR LED attached to LED pin!
  //Serial.print("Prox: "); Serial.println(uv.readProx());

  float UVindex = uv.readUV();
  // the index is multiplied by 100 so to get the
  // integer index, divide by 100!
  UVindex /= 100.0;  
  Serial.print("U:");  Serial.println(UVindex);
  
  Serial.println("$");
 // delay(1000);                        // wait 100ms for next reading
  

}
