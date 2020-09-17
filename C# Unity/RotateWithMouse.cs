using System.Collections;
using System.Collections.Generic;
using UnityEngine;


[ExecuteInEditMode]
public class RotateWithMouse : MonoBehaviour {

	[SerializeField] Vector3 whichCoordInput;
	[SerializeField] GameObject mouseGO;
	[SerializeField] float Sensetivity=0.3f;
	public float currentAngle;
	public float sumAngle =0f;
	MouseInput mouse;
	[SerializeField] int rotationWay = 1;
	
	
	void Start () {
		mouse = mouseGO.GetComponent<MouseInput>();
	}
	
	[SerializeField] bool invert = false;
	float invertValue ;
	
	
	
	void Update () {
		
		if(invert) invertValue = -1f;
		else invertValue = 1f;
		
		if(sumAngle> 360f)
			sumAngle-=360f;
		if(sumAngle<-360f)
			sumAngle+=360f;
		
		if(rotationWay == 1){
			transform.eulerAngles += new Vector3( 0, Vector3.Scale(Sensetivity*whichCoordInput,mouse.getMouseDelta()).x,0);
			currentAngle =  Vector3.Scale(Sensetivity*whichCoordInput,mouse.getMouseDelta()).x;
			sumAngle += currentAngle;
			
		}
		
		if(rotationWay == 2){
			transform.eulerAngles += new Vector3(  0,0,Vector3.Scale(Sensetivity*whichCoordInput,mouse.getMouseDelta()).x);
			currentAngle =  Vector3.Scale(Sensetivity*whichCoordInput,mouse.getMouseDelta()).x;
			sumAngle += currentAngle;
		}
		
		if(rotationWay == 3){
			currentAngle = Vector3.Scale( invertValue* Sensetivity * whichCoordInput,mouse.getMouseDelta()).x;
			sumAngle += currentAngle;
			transform.eulerAngles += new Vector3(  0f, 0f, currentAngle);
		}
	}
}
