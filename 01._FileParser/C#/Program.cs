using System;
using System.IO;
using System.Xml;
using System.Text.Json;
using Microsoft.VisualBasic.FileIO;
using YamlDotNet.Serialization;
using YamlDotNet.RepresentationModel;


internal class Program
{
    private static void Main(string[] args)
    {
        var jsonPath = "C:/Users/Balder/source/repos/SiCourseAssignments/me.json";
        var xmlPath = "C:/Users/Balder/source/repos/SiCourseAssignments/me.xml";
        var yamlPath = "C:/Users/Balder/source/repos/SiCourseAssignments/me.yaml";
        var csvPath = "C:/Users/Balder/source/repos/SiCourseAssignments/me.csv";


        Console.WriteLine("json File:");
        try
        {
            // Read the entire JSON file into a string
            string jsonString = File.ReadAllText(jsonPath);

            // Parse the JSON string into a JsonDocument
            JsonDocument jsonDocument = JsonDocument.Parse(jsonString);

            // Extract data from the JsonDocument
            foreach (JsonProperty property in jsonDocument.RootElement.EnumerateObject())
            {
                // Access property name and value
                Console.WriteLine($"Property: {property.Name}, Value: {property.Value}");
            }

            // Dispose the JsonDocument to release resources
            jsonDocument.Dispose();
        }
        catch (IOException e)
        {
            Console.WriteLine($"Error reading the JSON file: {e.Message}");
        }
        catch (JsonException e)
        {
            Console.WriteLine($"Error parsing the JSON: {e.Message}");
        }



        Console.WriteLine("csv File:");

        try 
        {
            // Create a TextFieldParser to read the CSV file
            using (TextFieldParser parser = new TextFieldParser(csvPath))
            {
            // Set TextFieldParser properties
                parser.TextFieldType = FieldType.Delimited;
                parser.SetDelimiters(",");

                while (!parser.EndOfData)
                {
                    string[] fields = parser.ReadFields();

                    // Process each field in the current line
                    foreach (string field in fields)
                    {
                        Console.Write(field + " ");
                    }
                    Console.WriteLine(); // Move to the next line
                }
            }
        } catch (Exception e)
        {
            Console.WriteLine($"Error reading the CSV file: {e.Message}");
        }



        Console.WriteLine("xml File");

        try
        {
        XmlDocument xmlDocument = new XmlDocument();
        xmlDocument.Load(xmlPath);

        XmlNode root = xmlDocument.DocumentElement;

        string name = root.SelectSingleNode("name").InnerText;
        Console.WriteLine($"name: {name}");
        int age = int.Parse(root.SelectSingleNode("age").InnerText);
        Console.WriteLine($"Age: {age}");
        XmlNode hobbiesNode = root.SelectSingleNode("hobbies");
            foreach (XmlNode hobbyNode in hobbiesNode.SelectNodes("hobby"))
            {
                string hobby = hobbyNode.InnerText;
                Console.WriteLine($"- {hobby}");
            }
        } catch (Exception e)
        {
            Console.WriteLine($"Error reading the XML file: {e.Message}");
        }

        Console.WriteLine("yaml File");

        using (var reader = new StreamReader(yamlPath))
        {
            var yaml = new YamlStream();
            yaml.Load(reader);

            var mapping = (YamlMappingNode)yaml.Documents[0].RootNode;

            foreach (var entry in mapping.Children)
            {
                var key = ((YamlScalarNode)entry.Key).Value;

                if (entry.Value is YamlScalarNode)
                {
                    var valueNode = (YamlScalarNode)entry.Value;
                    var value = valueNode.Value;
                    Console.WriteLine($"{key}: {value}");
                }
                else if (entry.Value is YamlSequenceNode)
                {
                    var valueNode = (YamlSequenceNode)entry.Value;
                    var values = valueNode.Children.Cast<YamlScalarNode>().Select(n => n.Value);
                    var value = string.Join(", ", values);
                    Console.WriteLine($"{key}: [{value}]");
                }
            }
        }
    }
}
