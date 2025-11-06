pipeline {
  agent any
  tools { nodejs 'node18' }

  options {
    // speeds up checkout when Jenkins already checked out in SCM step
    skipDefaultCheckout(true)
    timestamps()
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Build') {
      steps {
        sh 'echo Installing...'
        // use npm ci if you have a package-lock.json
        sh 'if [ -f package-lock.json ]; then npm ci; else npm install; fi'
      }
    }

    stage('Run App in Background') {
      steps {
        echo 'Stopping any old node processes (best-effort)...'
        sh 'pkill -f "node server.js" || true'

        echo 'Starting Node.js app in background...'
        sh '''
          nohup node server.js > app.log 2>&1 &
          sleep 2
          # Show process + last logs
          ps aux | grep "[n]ode" || true
          tail -n 50 app.log || true
        '''
      }
    }

    stage('Health Check (from Jenkins host)') {
      steps {
        sh 'curl -fsS http://localhost:3000/health && echo "\\nHealth OK" || (echo "Health check failed" && exit 1)'
      }
    }
  }

  post {
    success {
      echo '✅ Build successful. Open from your machine using: http://<EC2_PUBLIC_IP>:3000'
      archiveArtifacts artifacts: 'app.log', allowEmptyArchive: true
    }
    failure {
      echo '❌ Build failed'
      sh 'tail -n +1 app.log || true'
    }
    always {
      echo 'Job finished.'
    }
  }
}
