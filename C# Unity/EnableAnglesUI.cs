using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;



//[ExecuteInEditMode]
public class EnableAnglesUI : MonoBehaviour {

	[SerializeField] GameObject [] textInterf;
	[SerializeField] bool [] enable = {false, false, false };  // ekran  / transc / rupor
	
	
	
	void Update () {
		
		textInterf[0].SetActive(enable[0]);
		textInterf[1].SetActive(enable[0]);
		textInterf[2].SetActive(enable[1]);
		textInterf[3].SetActive(enable[1]);
		textInterf[4].SetActive(enable[2]);
		textInterf[5].SetActive(enable[2]);
	}
	
	public void enableUI(int UInmb, bool state){
		if(UInmb == 0){
			enable[0] = state;
			textInterf[0].SetActive(state);
			textInterf[1].SetActive(state);
			
		}
		if(UInmb == 1){
			enable[1] = state;
			textInterf[2].SetActive(state);
			textInterf[3].SetActive(state);
			
		}
		if(UInmb == 2){
			enable[2]= state;
			textInterf[4].SetActive(state);
			textInterf[5].SetActive(state);
			
		}
	}
}
