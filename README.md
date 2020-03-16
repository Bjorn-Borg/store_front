This is the repository for Björn Borg's headless solution project. Follow this README for setting it up and scripts.

### Available scripts

```
npm run dev
npm run performance
```

### Version control

This project is version controled in github and should follow the standard master > development > branching pattern. New updates to the project should go through pull requests, should be test covered, should not break any tests, and should comply with the performance threshold.

### Design pattern

The project leverages the nextJS routing and uses pages structure to organize each view.
The project is TDD. Every new feature needs unit, integration and e2e tests before merging to development.

### Next steps on setup

Setting a docker container to run this project in
Set the first test suites in Jest and Cypress

### Default nextJS instructions

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/zeit/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/zeit/next.js/) - your feedback and contributions are welcome!

## Deploy on ZEIT Now

The easiest way to deploy your Next.js app is to use the [ZEIT Now Platform](https://zeit.co/import?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
