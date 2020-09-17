using System.Collections;
using System.Collections.Generic;
using UnityEngine;




namespace DevicesNS {
	
	public class Devices : MonoBehaviour {

		[SerializeField] GameObject [] DevicesList = new GameObject [5] ;
		[SerializeField] GameObject [] DeviceButtons = new GameObject [5];
		
		public static Devices Instance;
			
		void Awake(){
			Instance = this;
		}
		
		public static GameObject[] GetDevicesList(){
			return Instance.DevicesList;
		}
		
		public static GameObject[] GetDeviceButtons(){
			return Instance.DeviceButtons;
		}
		
		
	}
}
