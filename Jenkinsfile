 pipeline {
  agent any
  tools { nodejs 'node18' }
  stages {
    stage('Checkout') { 
      steps { checkout scm } 
    }
    stage('Build') {
      steps {
        sh 'echo Installing...'
        sh 'npm install'
      }
    }
    stage('Run') {
      steps {
        sh 'node server.js &'
        sh 'sleep 2'
        sh 'curl -f http://localhost:3000/health || echo Health check failed'
      }
    }
  }
  post {
    success { echo '✅ Build successful' }
    failure { echo '❌ Build failed' }
  }
}
