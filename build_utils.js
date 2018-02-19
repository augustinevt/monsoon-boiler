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
   message: 'Does the AWS CLI have the proper config (export AWS_PROFILE=august)?',
   name: 'reminder'
  }
];

inquirer.prompt(questions).then((answers) => {
    cp.execSync(`npm run build`, { stdio: [0,1,2]});
  if (answers.deploy === 'yes') {
    cp.execSync(`aws s3 rm s3://eoautils --recursive`, { stdio: [0,1,2]});
    cp.execSync(`aws s3 sync ./build  s3://eoautils`, { stdio: [0,1,2]});
  }
});

// export AWS_PROFILE=prod
//aws ecr get-login --no-include-email
// aws ecs register-task-definition --cli-input-json file://./ecs_task_config.json
// aws ecs update-service --cluster frontend-utils --service util-app --task-definition frontend-util-app --desired-count 1
