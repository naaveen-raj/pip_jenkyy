pipeline {
  agent any
  options { skipDefaultCheckout(true) }   // avoid the implicit checkout
  tools { nodejs 'node18' }               // must match your NodeJS tool name
  environment { PORT = '3000' }

  stages {
    stage('Checkout') {
      steps { checkout scm }
    }

    stage('Install') {
      steps {
        sh 'node -v && npm -v'
        sh '[ -f package-lock.json ] && npm ci || npm install'
      }
    }

    stage('Health check') {
      steps {
        sh '''
          set -euxo pipefail
          node server.js &
          APP_PID=$!
          # Give the server a moment to bind
          for i in {1..10}; do
            if curl -fsS "http://localhost:${PORT}/health" >/dev/null; then
              echo "Health OK"
              break
            fi
            sleep 1
          done
          curl -f "http://localhost:${PORT}/health"
          kill $APP_PID
          # don't fail the build if process already exited after kill
          wait $APP_PID || true
        '''
      }
    }
  }

  post {
    success { echo '✅ Build successful' }
    failure { echo '❌ Build failed' }
  }
}
