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
