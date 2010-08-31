using System;
using System.Collections;
using System.Collections.Generic;
using System.Reflection;
using System.Text;
using System.Xml;
using System.Xml.Serialization;

namespace Nitobi
{
	/// <summary>
	/// The top parent class for all inner elements of the Nitobi ASP.NET controls.  This class
	/// helps to write very simple XML output of its children, and can also recreate a tree
	/// of its child classes from XML.
	/// </summary>
	/// <remarks>While the .NET XML serialization process is good enough under most situations,
	/// the XML output it creates is a little more verbose than it should be for the purpose of inner 
	/// content within a control.  Also, when serializing a heterogenious list of BaseEntity child
	/// classes, the .NET XML serialization process produces very tedious XML that would be hard
	/// to recreate by hand.
	/// 
	/// This class has a static list of registered childen that it can use like a class factory
	/// during de-serialization.  This allows a simple name from an XML element to be used as 
	/// the key into the colection of registered classes to recreate the objects.  This was done
	/// in a way as to also be compatible with the ASP.NET process of reading the inner content of
	/// a server control and creating the objects that they represent.  Thus, the format of the inner
	/// contents for all the Nitobi controls can be processed by the methods in this class and the standard
	/// ASP.NET mechanism.
	/// 
	/// With the serialization mechanisms of this class, the Nitobi ASP.NET server controls can offer the 
	/// ability to load their inner content through a method that takes XML rather than having that inner
	/// content specified in the ASPX or user control.  For example, rather than having to have the columns
	/// of a grid specified inside the grid server side HTML, the application could read the column information
	/// from a database and provide that to the grid.  That would serve as a good foundation for users of
	/// the application being able to have customized columns for any given grid.  This is similar to outlook
	/// which lets its users customize the order of the columns and which columns out of all the possible
	/// columns they would like to see.</remarks>
	public class BaseEntity
	{
		protected Dictionary<string, object> m_values = new Dictionary<string, object>();

		protected object getObj(string key, object defaultValue)
		{
			return m_values.ContainsKey(key) ? m_values[key] : defaultValue;
		}
		protected void setObj(string key, object value)
		{
			m_values[key] = value;
		}

		protected virtual void writeXmlState(XmlTextWriter xmlOut)
		{
			List<PropertyInfo> writeAsElements = new List<PropertyInfo>();
			xmlOut.WriteStartElement(InnerElementName);
			Type myType = this.GetType();
			PropertyInfo[] publicProperties = myType.GetProperties(BindingFlags.Public | BindingFlags.FlattenHierarchy | BindingFlags.Instance);
			//First write attributes, then write elements
			foreach (PropertyInfo prop in publicProperties)
				if(prop.GetCustomAttributes(typeof(XmlIgnoreAttribute), false).Length == 0)
				{
					object val = prop.GetValue(this, null);
					if (shouldSerializeProperty(prop, val))
						if (!(val is string) && val is IEnumerable)
							writeAsElements.Add(prop);
						else
							xmlOut.WriteAttributeString(prop.Name, val.ToString());
				}

			//Write properties that should be elements next
			foreach (PropertyInfo prop in writeAsElements)
			{
				object val = prop.GetValue(this, null);
				if (val is IEnumerable)
				{
					xmlOut.WriteStartElement(prop.Name);
					foreach (object e in (IEnumerable)val)
						if (e is BaseEntity)
							((BaseEntity)e).writeXmlState(xmlOut);
					xmlOut.WriteEndElement();
				}
				else
					if (val is BaseEntity)
						((BaseEntity)val).writeXmlState(xmlOut);
			}

			xmlOut.WriteEndElement();
		}

		protected virtual void readXmlState(XmlTextReader xmlIn)
		{
			if (xmlIn.HasAttributes)
			{					
				for (int i = 0; i < xmlIn.AttributeCount; ++i)
				{
					xmlIn.MoveToAttribute(i);
					setPropertyFromXml(this.GetType(), this, xmlIn.Name, xmlIn.Value);
				}
				xmlIn.MoveToElement();
			}

			if (!xmlIn.IsEmptyElement)
				while (xmlIn.Read())
					if (xmlIn.NodeType == XmlNodeType.Element)
					{
						PropertyInfo prop = this.GetType().GetProperty(xmlIn.Name);
						if (prop != null && prop.PropertyType.GetInterface("IList") != null)
						{
							IList listProp = (IList)prop.GetValue(this, null);
							while (xmlIn.Read())
							{
								if (xmlIn.NodeType == XmlNodeType.EndElement)
									break;
								BaseEntity ce = BaseEntity.createFromXml(xmlIn);
								if(ce != null)
									listProp.Add(ce);
							}

						}
					}
					else if (xmlIn.NodeType == XmlNodeType.EndElement)
						break;
		}

		protected virtual string InnerElementName {	get	{return this.GetType().Name; }	}

		protected virtual bool shouldSerializeProperty(PropertyInfo prop, object currentVal)
		{
			return currentVal != null;
		}

		protected static Dictionary<string, string> s_knownChildTypes = new Dictionary<string, string>();
		protected static bool registerChildType(Type childType)
		{
			return registerChildType(childType.Name, childType.AssemblyQualifiedName);
		}

		protected static bool registerChildType(string elementName, string fullyQualifiedClassName)
		{
			bool isFirst = !s_knownChildTypes.ContainsKey(elementName);
			s_knownChildTypes[elementName] = fullyQualifiedClassName;
			return isFirst;
		}

		protected static BaseEntity createFromXml(XmlTextReader xmlIn)
		{
			BaseEntity newEntity = null;

			string childTypeName;
			s_knownChildTypes.TryGetValue(xmlIn.Name, out childTypeName);

			Type childType = null;
			ConstructorInfo constructor;
			if (childTypeName != null && (childType = Type.GetType(childTypeName)) != null && (constructor = childType.GetConstructor(Type.EmptyTypes)) != null)
				newEntity = (BaseEntity)constructor.Invoke(null);

			if (newEntity != null)
				newEntity.readXmlState(xmlIn);

			return newEntity;
		}

		protected static void setPropertyFromXml(Type childType, object child, string xmlName, string xmlVal)
		{
			object propVal = null;
			ConstructorInfo constructor = null;
			PropertyInfo prop = childType.GetProperty(xmlName);
			if (prop != null)
			{
				MethodInfo m = null;
				Type propType = prop.PropertyType;
				if (propType.FullName == "System.String")
					propVal = xmlVal;
				else if (propType.IsEnum)
					propVal = System.Enum.Parse(propType, xmlVal, true);
				else if ((m = propType.GetMethod("Parse", new Type[] { typeof(String) })) != null)
					propVal = m.Invoke(null, new object[] { xmlVal });
				else if ((constructor = propType.GetConstructor(new Type[] { typeof(string) })) != null)
					propVal = constructor.Invoke(new object[] { xmlVal });

				if (propVal != null)
					prop.SetValue(child, propVal, null);
			}
		}
	}
}
