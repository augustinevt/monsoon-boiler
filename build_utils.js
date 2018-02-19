const fs = require('fs');
const inquirer = require('inquirer');
const cp = require('child_process');

const questions = [
  {
   type: 'input',
   message: 'Build and deploy util app?',
   name: 'deploy'
 },
  {
   type: 'input',
   message: 'Does the AWS CLI have the proper config (export AWS_PROFILE=prod)?',
   name: 'reminder'
  }
];

inquirer.prompt(questions).then((answers) => {
    cp.execSync(`npm run build`, { stdio: [0,1,2]});
  if (answers.deploy === 'yes') {
    cp.execSync(`docker build -t frontend-util-app .`, { stdio: [0,1,2]});
    cp.execSync(`export AWS_PROFILE=prod`, { stdio: [0,1,2]});
    cp.execSync(`docker tag frontend-util-app 437211659685.dkr.ecr.us-east-1.amazonaws.com/frontend-util-app`, { stdio: [0,1,2]});
    cp.execSync(`docker push 437211659685.dkr.ecr.us-east-1.amazonaws.com/frontend-util-app`, { stdio: [0,1,2]});
    cp.execSync(`$(aws ecr get-login --no-include-email)`, { stdio: [0,1,2]});
    cp.execSync(`aws ecs register-task-definition --cli-input-json file://./ecs_task_config.json`, { stdio: [0,1,2]});
    cp.execSync(`aws ecs update-service --cluster frontend-utils --service util-app --task-definition frontend-util-app --desired-count 1`, { stdio: [0,1,2]});
  }
});

// export AWS_PROFILE=prod
//aws ecr get-login --no-include-email
// aws ecs register-task-definition --cli-input-json file://./ecs_task_config.json
// aws ecs update-service --cluster frontend-utils --service util-app --task-definition frontend-util-app --desired-count 1
