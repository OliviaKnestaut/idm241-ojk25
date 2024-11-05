const movies = [
    {
        movieid: "pride-and-prejudice",
        title: "Pride & Prejudice",
        year: 2005,
        viewed: false,
        liked: false
    },
    {
        movieid: "jaws",
        title: "Jaws",
        year: 1975,
        viewed: false,
        liked: false
    },
    {
        movieid: "howls-moving-castle",
        title: "Howl's Moving Castle",
        year: 2004,
        viewed: false,
        liked: false
    }
];



/*VIEW BUTTON*/
document.querySelectorAll(".view").forEach(icon => {
    icon.addEventListener("click", function() {
        const movieTitle = this.closest(".beta").querySelector(".tooltip-text").textContent;
        const movie = movies.find(m => m.movieid === this.closest(".beta").id);

        //Remove previous statuses
        this.closest(".poster").querySelector(".border").classList.remove("border-like-away");
        this.closest(".poster").querySelector(".border").classList.remove("border-view-to-like");
        this.closest(".poster").querySelector(".border").classList.remove("border-like-to-view");
        this.closest(".tile").querySelector(".gradient-fade").classList.remove("liked-gradient");


        // Find the movie object in the array that matches the clicked icon's ID

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
            
            movie.viewed = true; 


        } else if (this.classList.contains("view-active")) {
        
            this.classList.remove("view-active");
            this.classList.add("view-default");

            this.closest(".poster").querySelector(".border").classList.remove("border-like-to-view")
            this.closest(".poster").querySelector(".border").classList.remove("border-view");  // Remove "border-view" from the corresponding border

            if (this.closest(".overlay").querySelector(".like").classList.contains("like-active")){
                this.closest(".poster").querySelector(".border").classList.add("border-view-to-like");
            }
            else{
                this.closest(".poster").querySelector(".border").classList.add("border-view-away");  // Add "border-view-away" to the corresponding border

            }
            this.closest(".tile").querySelector(".movie-link").style.height = "82.5%"
            this.closest(".tile").querySelector(".gradient-fade").classList.remove("viewed-gradient");
            this.closest(".tile").querySelector(".overlay").classList.remove("ratings");
            

            movie.viewed = false;
        }

        console.log(movie.title, " is viewed: ", movie.viewed);
    });
});






/*LIKE BUTTON*/
document.querySelectorAll(".like").forEach(icon => {
    icon.addEventListener("click", function() {
        const movieTitle = this.closest(".beta").querySelector(".tooltip-text").textContent;
        const movie = movies.find(m => m.movieid === this.closest(".beta").id);


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
