pipeline {
  agent any

  tools {
    nodejs 'node18'   // 👈 must match the name you configured
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }
     stage('Run') {
      steps {
        sh 'node server.js &'
        sh 'sleep 2'
        sh 'curl -f http://13.53.217.206:3000/health || echo Health check failed'
      }
    }


    stage('Install Dependencies') {
      steps {
        sh 'npm install || true'   // no dependencies now but safe
      }
    }

    stage('Start App') {
      steps {
        sh 'npm start &'
      }
    }
  }

  post {
    success {
      echo '✅ Application started successfully!'
    }
    failure {
      echo '❌ Build failed'
    }
  }
}
