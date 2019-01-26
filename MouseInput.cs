using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

[ExecuteInEditMode]
public class MouseInput : MonoBehaviour {

	Vector3 prevPos;
	Vector3 currentPos;
	Vector3 mouseDelta;
	public float speed =1;
	public bool outputDebug = true;
	
	public Vector3 getMouseDelta(){
		return mouseDelta;
	}
	
	[SerializeField] Text debugText;
	
	void Start(){
		prevPos = Input.mousePosition;
	}

	
	
	void Update () {
		currentPos = Input.mousePosition;
		mouseDelta = ( prevPos - currentPos ) * speed;
		if(outputDebug)debugText.text = mouseDelta.ToString();
		prevPos = currentPos;
		
	}
}
