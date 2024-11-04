pipeline {
    agent any

    tools {
        nodejs 'NodeJS 23.1.0'  // Ensure Node.js is available
    }

    environment {
        DEPLOY_ENV = 'production'  // Set environment variable for deployment
    }

    stages {
        stage('Checkout Code') {
            steps {
                // Clone the repository, using the correct branch name
                git url: 'https://github.com/subrat-kmr/practice-forms.git', branch: 'master'
            }
        }
        stage('Install Dependencies') {
            steps {
                echo 'Installing project dependencies...'
                sh 'npm ci'  // Use 'npm ci' for faster, cleaner install in CI environments
            }
        }
        stage('Build') {
            steps {
                echo 'Building Angular app for production...'
                sh 'ng build --configuration=${DEPLOY_ENV}'  // Flexible for different environments
            }
        }
        stage('Test') {
            steps {
                echo 'Running unit tests...'
                sh 'ng test --watch=false --browsers=ChromeHeadless'  // Ensure headless mode for CI
            }
        }
        stage('Lint') {
            steps {
                echo 'Running linter...'
                sh 'ng lint'  // Optionally add --fix to auto-fix issues
            }
        }
        stage('Deploy') {
            when {
                branch 'master'  // Adjust if needed, deploy only when on the correct branch
            }
            steps {
                echo 'Deploying to production...'
                sh 'npm run deploy -- --env=${DEPLOY_ENV}'  // Deploy command with environment variable
            }
        }
    }

    post {
        always {
            echo 'Cleaning up workspace...'
            cleanWs()  // Clean workspace after build
        }
        failure {
            mail to: 'subratkmr0@gmail.com',
                 subject: 'Build Failed: ${currentBuild.fullDisplayName}',
                 body: """Build failed in Jenkins: ${env.BUILD_URL}

                 Check console output at ${env.BUILD_URL} to view the logs."""
        }
        success {
            mail to: 'subratkmr0@gmail.com',
                 subject: 'Build Successful: ${currentBuild.fullDisplayName}',
                 body: """Build successful in Jenkins: ${env.BUILD_URL}

                 The application has been built and deployed successfully!"""
        }
    }
}
