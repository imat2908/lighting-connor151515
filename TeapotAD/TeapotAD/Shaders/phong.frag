#version 430

in vec3 vertPos;
in vec3 N;
in vec3 lightPos;
/*TODO:: Complete your shader code for a full Phong shading*/ 

uniform vec3 Kd;            // Diffuse reflectivity
uniform vec3 Ld;            // Diffuse light intensity
uniform mat4 V;
vec3 cameraPos;

// complete to a full phong shading
layout( location = 0 ) out vec4 FragColour;

void main()
{

   //Calculate the light vector
   vec3 L = normalize(lightPos - vertPos);  //What is this code doing?
   //calculate Diffuse Light Intensity making sure it is not negative and is clamped 0 to 1  
   vec4 Id = vec4(Ld,1.0) * max(dot(N,L), 0.0);// Why do we need vec4(vec3)?
   Id = clamp(Id, 0.0, 1.0); // What is the role of clamp function? Why do we need it? 

   vec3 ambientLight = vec3 (0.3, 0.3, 0.3);

   
  //Specular light 
  vec3 reflectDirVec = normalize(reflect(L, normalize(vertPos)));
  vec3 positionToViewDirVec = normalize(vertPos - cameraPos);
  float specularConst = pow(max(dot(positionToViewDirVec, reflectDirVec), 0), 5);
  vec3 specularLight = vec3(0.3, 0.3, 0.3) * specularConst;

   //Multiply the Reflectivity by the Diffuse intensity
   FragColour = (vec4(Kd, 1.0) + vec4(ambientLight, 0.0) + vec4(specularLight, 0.0)) * Id;
}
