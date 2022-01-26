pipeline {
    environment {
        PROJECT_ID = 'test-k8s-338611'
        CLUSTER_NAME = 'test-client-1'
        LOCATION = 'europe-west2-b'
        CREDENTIALS_ID = 'k8s'
    }

    agent {
    kubernetes {
      label 'test-client-1'
      defaultContainer 'jnlp'
      yaml """
apiVersion: v1
kind: Pod
metadata:
labels:
  component: ci
spec:
  # Use service account that can deploy to all namespaces
  serviceAccountName: jenkins-1
  - name: gcloud
    image: gcr.io/cloud-builders/gcloud
    command:
    - cat
    tty: true
  - name: kubectl
    image: gcr.io/cloud-builders/kubectl
    command:
    - cat
    tty: true
"""
}
  }

    stages {
        stage("Checkout code") {
            steps {
                checkout scm
            }
        }
        container('gcloud') {
          sh "PYTHONUNBUFFERED=1 gcloud container clusters list"
        }
        // stage("Build image") {
        //     steps {
        //         script {
        //             dockerImage = docker.build("passhag/test-client-1:latest")
        //         }
        //     }
        // }
        // stage("Push image") {
        //     steps {
        //         script {
        //             withCredentials([usernamePassword(credentialsId: 'docker-login-creds', passwordVariable: 'password', usernameVariable: 'username')]) {
        //                 sh '''
        //                     echo "${password} | docker login -u ${username} --password-stdin"
        //                  '''
        //             }
        //             dockerImage.push()
        //         }
        //     }
        // }

        // stage("Deploy") {
        //     steps {
        //         step([$class: 'KubernetesEngineBuilder', projectId: env.PROJECT_ID, clusterName: env.CLUSTER_NAME, zone: env.LOCATION, manifestPattern: 'k8s/depl.yaml', credentialsId: "k8s", verifyDeployments: true])
        //     }
        // }
    }    
}
