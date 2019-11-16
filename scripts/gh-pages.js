const ghpages = require('gh-pages');

ghpages.publish('build', {
    branch: 'gh-pages',
    repo: 'https://github.com/logovazzik/draft.git'
}, (err) => {
    console.log(err);
});
