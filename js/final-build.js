const movies = [
    {
        movieid: "pride-and-prejudice",
        title: "Pride & Prejudice",
        year: 2005,
        viewed: false,
        liked: false,
        rating: 0
    },
    {
        movieid: "jaws",
        title: "Jaws",
        year: 1975,
        viewed: false,
        liked: false,
        rating: 0
    },
    {
        movieid: "howls-moving-castle",
        title: "Howl's Moving Castle",
        year: 2004,
        viewed: false,
        liked: false,
        rating: 0
    }
];

const tiles = document.querySelectorAll('.tile');

/*--------------------------------- VIEW BUTTON -------------------------------------*/

document.querySelectorAll(".view").forEach(icon => {
    icon.addEventListener("click", function() {
        const movie = movies.find(m => m.movieid === this.closest(".final").id);

        //Remove previous statuses
        this.closest(".poster").querySelector(".border").classList.remove("border-like-away");
        this.closest(".poster").querySelector(".border").classList.remove("border-view-to-like");
        this.closest(".poster").querySelector(".border").classList.remove("border-like-to-view");
        this.closest(".tile").querySelector(".gradient-fade").classList.remove("liked-gradient");


        if (this.classList.contains("view-default")) {
            this.classList.remove("view-default");
            this.classList.add("view-active");


            this.closest(".poster").querySelector(".border").classList.remove("border-view-away");

            //If Currently Liked
            if (this.closest(".overlay").querySelector(".like").classList.contains("like-active")){
                this.closest(".poster").querySelector(".border").classList.remove("border-like");
                this.closest(".poster").querySelector(".border").classList.add("border-like-to-view");

            } else{
                this.closest(".poster").querySelector(".border").classList.add("border-view");
            }

            this.closest(".tile").querySelector(".movie-link").style.height = "70%"
            this.closest(".tile").querySelector(".overlay").classList.add("ratings");
            this.closest(".tile").querySelector(".gradient-fade").classList.add("viewed-gradient");
            this.closest(".final").querySelector(".more-menu").classList.add("more-menu-up");


            
            movie.viewed = true; 


        } else if (this.classList.contains("view-active") && movie.rating > 0){
            document.querySelector(".error-message").style.visibility = 'visible';
            document.querySelector(".error-message").classList.add("error-visible");
            document.querySelector(".error-text").textContent = movie.title + " can't be removed from your films because it has activity on it";

            setTimeout(() => {
                document.querySelector(".error-message").classList.remove("error-visible");
                setTimeout(() => {
                    document.querySelector(".error-message").style.visibility = 'hidden';
                }, 300);
            }, 4000);
            
        } else if (this.classList.contains("view-active")) {
        
            this.classList.remove("view-active");
            this.classList.add("view-default");

            this.closest(".poster").querySelector(".border").classList.remove("border-like-to-view")
            this.closest(".poster").querySelector(".border").classList.remove("border-view");
            this.closest(".tile").querySelector(".border").classList.remove("border-view-to-rate");
            this.closest(".poster").querySelector(".border").classList.remove("border-rate-to-view");

            if (this.closest(".overlay").querySelector(".like").classList.contains("like-active")){
                this.closest(".poster").querySelector(".border").classList.add("border-view-to-like");
            }
            else{
                this.closest(".poster").querySelector(".border").classList.add("border-view-away");  // Add "border-view-away" to the corresponding border

            }
            this.closest(".tile").querySelector(".movie-link").style.height = "82.5%"
            this.closest(".tile").querySelector(".gradient-fade").classList.remove("viewed-gradient");
            this.closest(".tile").querySelector(".overlay").classList.remove("ratings");
            this.closest(".final").querySelector(".more-menu").classList.remove("more-menu-up");


            

            movie.viewed = false;
        }

        console.log(movie.title, " is viewed: ", movie.viewed);
    });
});


/*--------------------------------- LIKE BUTTON -------------------------------------*/

document.querySelectorAll(".like").forEach(icon => {
    icon.addEventListener("click", function() {
        const movie = movies.find(m => m.movieid === this.closest(".final").id);


        //Remove previous statuses
        this.closest(".poster").querySelector(".border").classList.remove("border-view-away");
        this.closest(".poster").querySelector(".border").classList.remove("border-view-to-like");
        this.closest(".tile").querySelector(".gradient-fade").classList.remove("viewed-gradient");

        if (this.classList.contains("like-default")) {
            this.classList.remove("like-default");
            this.classList.add("like-active");


            if (this.closest(".overlay").querySelector(".view").classList.contains("view-default")){
                this.closest(".poster").querySelector(".border").classList.remove("border-like-away");
                this.closest(".poster").querySelector(".border").classList.add("border-like");
            }
            
            this.closest(".tile").querySelector(".gradient-fade").classList.add("liked-gradient");

            movie.liked = true; 

        } else if (this.classList.contains("like-active")) {

            if (this.closest(".overlay").querySelector(".view").classList.contains("view-default")){
                this.closest(".poster").querySelector(".border").classList.remove("border-like");  // Remove "border-like" from the corresponding border
                this.closest(".poster").querySelector(".border").classList.add("border-like-away");  // Add "border-like-away" to the corresponding border
            
            }
        
            this.classList.remove("like-active");
            this.classList.add("like-default");

            this.closest(".tile").querySelector(".gradient-fade").classList.remove("liked-gradient");

            movie.liked = false; 
        }

        console.log(movie.title, " is liked: ", movie.liked);
    });
});

/*--------------------------------- ANIMATE PAGE LOAD -------------------------------------*/

document.querySelectorAll(".movie-link").forEach((link) => {
    link.addEventListener("click", function (event) {
        event.preventDefault();

        const tile = this.closest(".tile");
        const loadElement = tile.querySelector(".load");

        loadElement.classList.remove("loading-start");
        loadElement.classList.add("loading-loop");

        // Define the animationend handler as a named function
        const handleAnimationEnd = () => {
            console.log(this.href);
            window.open(this.href, "_blank");

            loadElement.removeEventListener("animationend", handleAnimationEnd);

            loadElement.classList.remove("loading-loop");
            loadElement.classList.add("loading-start");
        };

        loadElement.addEventListener("animationend", handleAnimationEnd);
    });
});


tiles.forEach(tile => {
    const movieLink = tile.querySelector('.movie-link');

    movieLink.addEventListener('mousedown', () => {
        tile.style.transform = 'scale(1.1)';
    });

    movieLink.addEventListener('mouseup', () => {
        tile.style.transform = 'scale(1.15)';
        setTimeout(() => {
            tile.style.transform = '';
        }, 600);
    });

});



/*--------------------------------- STAR RATING -------------------------------------*/

tiles.forEach((tile) => {
    const starsContainer = tile.querySelector('.stars');
    const starParts = starsContainer.querySelectorAll('.star-left, .star-right');
    let selectedRating = 0;
    const movie = movies.find(m => m.movieid === tile.closest(".final").id);

    starParts.forEach((starPart) => {

        // Highlight stars on hover
        starPart.addEventListener('mousemove', function () {
            const value = parseFloat(starPart.dataset.value);
            highlightStars(value, starsContainer);
        });

        starsContainer.addEventListener('mouseleave', function () {
            highlightStars(selectedRating, starsContainer);
        });

        starPart.addEventListener('mousedown', function () {
            const value = parseFloat(starPart.dataset.value);
            const movie = movies.find(m => m.movieid === starPart.closest(".final").id);

            movie.rating = value; 
            highlightStars(value, starsContainer);
            starsContainer.querySelectorAll('.star-left, .star-right').forEach((part) => {
                const partValue = parseFloat(part.dataset.value);
                if (partValue <= value) {
                    part.classList.add('selected-active-down');
                    part.classList.remove('selected-active-up');
                } else{
                    part.classList.remove('selected-active-down');
                    part.classList.remove('selected-active-up');
                }
            });

        });

        starPart.addEventListener('mouseup', function () {
            const value = parseFloat(starPart.dataset.value);
            highlightStars(value, starsContainer);
            starsContainer.querySelectorAll('.star-left, .star-right').forEach((part) => {
                const partValue = parseFloat(part.dataset.value);
                if (partValue <= value) {
                    part.classList.add('selected-active-up');
                    part.classList.remove('selected-active-down');
                } else{
                    part.classList.remove('selected-active-down');
                    part.classList.remove('selected-active-up');
                }

                const gradientFade = this.closest(".tile").querySelector(".gradient-fade");
                gradientFade.classList.remove("viewed-gradient");
                gradientFade.classList.remove("liked-gradient");
                gradientFade.classList.add("rated-gradient");

                gradientFade.addEventListener('animationend', function handleAnimationEnd() {
                gradientFade.classList.remove("rated-gradient");
                gradientFade.removeEventListener('animationend', handleAnimationEnd);
                });

                this.closest(".tile").querySelector(".border").classList.add("border-view-to-rate");
                this.closest(".poster").querySelector(".border").classList.remove("border-rate-to-view");


            });
            console.log(movie.title, " is rated: ", movie.rating);

            if (movie.rating > 0) {

                const starX = starsContainer.querySelector('.star-x');
                starX.classList.add('star-x-visible');
                
                starX.addEventListener('click', function () {
                movie.rating = 0;

                starsContainer.querySelectorAll('.star-left, .star-right').forEach((part) => {
                    part.classList.remove('selected-active-up');
                    part.classList.remove('selected-active-down');
                });

                console.log(`${movie.title} rating reset to: `, movie.rating);

                this.closest(".tile").querySelector(".border").classList.remove("border-view-to-rate");
                this.closest(".poster").querySelector(".border").classList.add("border-rate-to-view");
                starX.classList.remove('star-x-visible');

            });

            }
        });

    });

    function highlightStars(rating, container) {
        container.querySelectorAll('.star-left, .star-right').forEach((part) => {
            const value = parseFloat(part.dataset.value);

            if (value <= rating){
                part.classList.add('hover-opacity');
            } else {
                part.classList.remove('hover-opacity');   
            }

        });
    }

});

/*--------------------------------- MORE MENU -------------------------------------*/

    tiles.forEach(tile => {
        const menuIcon = tile.querySelector('.menu.more-default');
        const moreMenu = tile.parentElement.querySelector('.more-menu');

        if (menuIcon && moreMenu) {
            let isHovered = false;

            menuIcon.addEventListener('click', () => {
                if (moreMenu.classList.contains('menu-active')) {
                    moreMenu.classList.remove('menu-active');
                } else {
                    moreMenu.classList.add('menu-active');
                }
            });

            menuIcon.addEventListener('mouseenter', () => {
                isHovered = true;
            });
            menuIcon.addEventListener('mouseleave', () => {
                isHovered = false;
                setTimeout(() => {
                    if (!isHovered) {
                        moreMenu.classList.remove('menu-active');
                    }
                }, 100);
            });

            moreMenu.addEventListener('mouseenter', () => {
                isHovered = true;
            });
            moreMenu.addEventListener('mouseleave', () => {
                isHovered = false;
                setTimeout(() => {
                    if (!isHovered) {
                        moreMenu.classList.remove('menu-active');
                    }
                }, 100);
            });
        }

        tile.closest(".final").querySelector('.menu-text:last-child').addEventListener('mouseenter', () => {
            tile.closest(".final").querySelector('.menu-arrow').style.borderRightColor = '#364452';
        });

        tile.closest(".final").querySelector('.menu-text:last-child').addEventListener('mouseleave', () => {
            tile.closest(".final").querySelector('.menu-arrow').style.borderRightColor = '';
        });

    });


