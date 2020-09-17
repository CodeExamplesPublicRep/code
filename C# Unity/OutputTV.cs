using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using System;


[ExecuteInEditMode]
public class outputTV : MonoBehaviour {
	
	
	public enum mode { sin, growWithTime, lowWithTime, positiveSin,negativeCoord, sin2, cos, twoSinWithShift, sinWithCoordArgument, zero, noise,dependOnRotat, positiveCoord, beforeAfterShield,positiveCoord3, stableLevel,stableLevelAbs1,stableLevelAbs2 };
	public mode outputMode = mode.noise;
	
	public bool useAbsoluteValue = true;
	public float shiftValue = 0f;
	public float valueMultiplier = 3f; 
	public float frequency = 0.5f; 
	float pi= 3.14159265359f;
	public float noiseLevelMult = 1;
	public float noisePowerMult = 1;
	public float noiseLevel = 0;
	public float moveSinMultipl =1;
	float outputMultiplier = 2;
	public Vector3 whichCoordSinArg = new Vector3(0,0,0);
	public GameObject GO;
	float coordinateValue = 1;
	public float twoSinMult =20;
	public bool trueRotationFalsePosition = true;
	Text output ;
	[SerializeField] public float phase = 0f;
	[SerializeField] DateTime currentTime;
	private Transform trans;
	public float amplitude = 2.0f;
	 
	 
	
	void Start () {
		output = this.gameObject.GetComponent<Text>();
		trans = GO.transform;
		
	}
	
	void initializeCoordinate(){
		if(trueRotationFalsePosition){
			//rotate
			if( whichCoordSinArg.x == 1 )
				coordinateValue = GO.transform.rotation.x * whichCoordSinArg.x;
			if( whichCoordSinArg.y == 1 )
				coordinateValue = GO.transform.rotation.y * whichCoordSinArg.y;
			if( whichCoordSinArg.z == 1 )
				coordinateValue = GO.transform.rotation.z * whichCoordSinArg.z;
		}else{
			//move
			if( whichCoordSinArg.x == 1 )
				coordinateValue = GO.transform.position.x * whichCoordSinArg.x * moveSinMultipl;
			if( whichCoordSinArg.y == 1 )
				coordinateValue = GO.transform.position.y * whichCoordSinArg.y * moveSinMultipl;
			if( whichCoordSinArg.z == 1 )
				coordinateValue = GO.transform.position.z * whichCoordSinArg.z * moveSinMultipl;
		}
	}
	void getCoordValOfRot(){
		float coor = GO.transform.rotation.y;
		coordinateValue =  -45 +coor;
	}
	void getNewRotatCoord(){
		coordinateValue = 180 - GO.transform.rotation.y;
	}
	 
	 float deltaT = 0, sumDeltaT = 0;
	 
	public void resetDeltaTime(){
		deltaT = 0;
		sumDeltaT = 0;
	}
	
	void Update () {
		
		float result;
		
		switch(outputMode){
			case mode.sin:
				result =  (float) Math.Sin(Time.time) * valueMultiplier ;
				break;
			case mode.positiveSin:
				result = (float) (  (Math.Sin(Time.time) * valueMultiplier) > 0 ? (Math.Sin(Time.time) * valueMultiplier) :  UnityEngine.Random.Range(-0.01f, 0.01f) ) ;
				break;
			case mode.zero:
				result = (float) UnityEngine.Random.Range(-0.01f * noisePowerMult, 0.01f * noisePowerMult) * noiseLevelMult +noiseLevel;;
				break;
			case mode.noise:
				result = (float) UnityEngine.Random.Range(-0.01f * noisePowerMult, 0.01f * noisePowerMult) * noiseLevelMult +noiseLevel;
				break;		
			case mode.beforeAfterShield:
				if( GO.transform.rotation.y < 120f ) 
					result = (float) UnityEngine.Random.Range( -0.01f * 1.2f, 0.01f * 1.2f );
				else
					result = (float) UnityEngine.Random.Range( -0.01f * noisePowerMult, 0.01f * noisePowerMult ) * 190f;
				break;				
			case mode.twoSinWithShift:
				initializeCoordinate();
				result = (float) Math.Abs(  (float) ( Math.Sin( (coordinateValue + shiftValue)* twoSinMult * frequency  * Mathf.Deg2Rad) + Math.Sin( coordinateValue  * frequency * twoSinMult * Mathf.Deg2Rad ) )*valueMultiplier ) ;
				break;
			case mode.positiveCoord:
				initializeCoordinate();
				result = (float)   Math.Abs( Math.Sin( Mathf.Deg2Rad*(coordinateValue + shiftValue)* pi )* valueMultiplier ) ;
				break;
			case mode.dependOnRotat:
				initializeCoordinate();	
				result = (float)   Math.Abs( Math.Sin( Mathf.Deg2Rad*(-coordinateValue )* pi  ) ) ;
				break;
			case mode.growWithTime:
				currentTime = DateTime.Now;			
				result = (float)   Math.Abs( Math.Sin( Mathf.Deg2Rad* currentTime.Second  ) ) ;
				break;
			case mode.lowWithTime:
				currentTime = DateTime.Now;			
				result = (float)   Math.Abs( Math.Sin( Mathf.Deg2Rad / currentTime.Second  ) ) ;
				break;
			case mode.stableLevel:
				result = (float) UnityEngine.Random.Range(-0.01f  , 0.01f ) + 1.2f;
				break;
			case mode.stableLevel2:
				result = (float) UnityEngine.Random.Range(-0.01f  , 0.01f ) + 0.95f;
				break;	
			default:
				result = (float) 0f;
				break;
		}
		
		output.text = ( (useAbsoluteValue ? Math.Abs( result ) : result)* outputMultiplier ) .ToString();
	
	}
	
	public void SetGameObject( GameObject GObj){
		GO = GObj;
	}
	
	public float trim360(float Angle){
		if( Angle > 360f )
			Angle -= 360f;
		if( Angle < 360f )
			Angle += 360f;
		return Angle;
	}
	
	
	
}
