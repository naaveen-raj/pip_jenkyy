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
  stage('Run App in Background') {
  steps {
    echo 'Stopping any old node processes (best-effort)...'
    sh 'pkill -f server.js || true'
    echo 'Starting Node.js app in background...'
    sh '''
      nohup node server.js > app.log 2>&1 &
      sleep 1
      ps aux | grep node | grep -v grep || true
      tail -n 20 app.log || true
      #echo "If SG is open, open: http://$JENKINS_URL should not be used; use your EC2 public IP: http://<EC2_PUBLIC_IP>:3000"
    '''
  }
}

  post {
    success { echo '✅ Build successful' }
    failure { echo '❌ Build failed' }
  }
}
