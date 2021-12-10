$(function() {
    $('.like-button').each(function() {
        if (sessionStorage.getItem("liked" + this.dataset.id) == 1) {
            $(this).css("opacity", 0.5);
        } else {
            $(this).css("opacity", 1);
        }

        $(this).on('click', function() {
            const endpoint = `/posts/${this.dataset.id}`;
            let change;
            if (sessionStorage.getItem("liked" + this.dataset.id) == 1) {
                change = -1;
                sessionStorage.removeItem("liked" + this.dataset.id);
            } else {
                change = 1;
                sessionStorage.setItem("liked" + this.dataset.id, 1);
            }

            fetch(endpoint, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ "likes": change })
            }).then(window.location.reload()).then(window.location.href = '/posts');

        });
    });
});