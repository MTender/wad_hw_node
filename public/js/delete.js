$(function() {
    $('#delete').on('click', function() {
        const endpoint = `/posts/${this.dataset.del}`;
        fetch(endpoint, {
            method: 'DELETE'
        }).then(window.location.reload()).then(window.location.href = '/posts');
    });
});