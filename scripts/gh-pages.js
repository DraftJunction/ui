const ghpages = require('gh-pages');

ghpages.publish('build', {
    branch: 'gh-pages',
    repo: 'https://github.com/DraftJunction/ui.git'
}, (err) => {
    console.log(err);
});
