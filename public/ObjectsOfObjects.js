function getShows() {
   const showList = getShowList(); // get the object from the function
   const cat = showCat.value;  // get the value from the drop down
   
   let rowString = "<tr><th>Key</th><th>Title</th><th>Casts</th><th>Year</th><th>Rating / Score</th></tr>";
   results.innerHTML = "";  // resets the table
   
   let count = 0;
   for (let key in showList) {
     // Show all categories if "All" is selected, otherwise filter by category
     if (cat === "All" || showList[key].category == cat) {
       rowString += "<tr>";
       rowString += "<td>" + key + "</td>";
       rowString += "<td>" + showList[key].title + "</td>";
       rowString += "<td>" + showList[key].cast + "</td>";
       rowString += "<td>" + showList[key].year + "</td>";
       rowString += "<td>" + showList[key].ratingScore() + "</td></tr>";
       count++;
     }
   }
   results.innerHTML = rowString;
   document.getElementById("count").textContent = "Shows found: " + count;
}

function delShows() {
   const cat = showCat.value;
   const showList = getShowList();
   
   // Confirmation dialog
   const confirmDelete = confirm("Are you sure you want to delete all shows in the '" + cat + "' category?");
   
   if (confirmDelete) {
     // Handle "All" category
     if (cat === "All") {
       let totalCount = 0;
       for (let key in showList) {
         delete showList[key];
         totalCount++;
       }
       
       results.innerHTML = "";
       document.getElementById("count").textContent = totalCount + " show(s) have been deleted";
       alert(totalCount + " show(s) deleted successfully!");
       return;
     }
     
     // Count and collect keys to delete
     let deleteCount = 0;
     let keysToDelete = [];
     
     for (let key in showList) {
       if (showList[key].category == cat) {
         keysToDelete.push(key);
         deleteCount++;
       }
     }
     
     if (deleteCount === 0) {
       alert("No shows found in '" + cat + "' category.");
       return;
     }
     
     // Delete the shows
     for (let i = 0; i < keysToDelete.length; i++) {
       delete showList[keysToDelete[i]];
     }
     
     // Clear the table
     results.innerHTML = "";
     document.getElementById("count").textContent = deleteCount + " show(s) from '" + cat + "' category have been deleted";
     
     alert(deleteCount + " show(s) deleted successfully from '" + cat + "' category!");
   } else {
     alert("Deletion cancelled.");
   }
}

function getShowList() {
  // sample of an object with objects
 const netflixShows = {
  breakingBad: {
    title: "Breaking Bad",
    category: "Drama",
    year: 2008,
    seasons: 5,
    rating: "TV-MA",
    cast: ["Bryan Cranston", "Aaron Paul"],
    language: "English",
    imdbScore: 9.5,
    awards: ["Emmy", "Golden Globe"],
    duration: "47 min per episode",
    availability: "Global",
    ratingScore: function () {
      return this.rating + " / " + this.imdbScore;
    }
  },
  theCrown: {
    title: "The Crown",
    category: "Drama",
    year: 2016,
    seasons: 6,
    rating: "TV-MA",
    cast: ["Olivia Colman", "Claire Foy"],
    language: "English",
    imdbScore: 8.6,
    awards: ["Golden Globe"],
    duration: "55 min per episode",
    availability: "Global",
    ratingScore: function () {
      return this.rating + " / " + this.imdbScore;
    }
  },
  brooklynNineNine: {
    title: "Brooklyn Nine-Nine",
    category: "Comedy",
    year: 2013,
    seasons: 8,
    rating: "TV-14",
    cast: ["Andy Samberg", "Terry Crews"],
    language: "English",
    imdbScore: 8.4,
    awards: ["Golden Globe"],
    duration: "22 min per episode",
    availability: "Global",
    ratingScore: function () {
      return this.rating + " / " + this.imdbScore;
    }
  },
  sexEducation: {
    title: "Sex Education",
    category: "Comedy",
    year: 2019,
    seasons: 4,
    rating: "TV-MA",
    cast: ["Asa Butterfield", "Gillian Anderson"],
    language: "English",
    imdbScore: 8.3,
    awards: ["BAFTA Nominee"],
    duration: "50 min per episode",
    availability: "Global",
    ratingScore: function () {
      return this.rating + " / " + this.imdbScore;
    }
  },
  strangerThings: {
    title: "Stranger Things",
    category: "Sci-Fi",
    year: 2016,
    seasons: 5,
    rating: "TV-14",
    cast: ["Millie Bobby Brown", "Finn Wolfhard"],
    language: "English",
    imdbScore: 8.7,
    awards: ["SAG Award"],
    duration: "50 min per episode",
    availability: "Global",
    ratingScore: function () {
      return this.rating + " / " + this.imdbScore;
    }
  },
  blackMirror: {
    title: "Black Mirror",
    category: "Sci-Fi",
    year: 2011,
    seasons: 6,
    rating: "TV-MA",
    cast: ["Various"],
    language: "English",
    imdbScore: 8.8,
    awards: ["Emmy"],
    duration: "60 min per episode",
    availability: "Global",
    ratingScore: function () {
      return this.rating + " / " + this.imdbScore;
    }
  },
  onePiece: {
    title: "One Piece",
    category: "Anime",
    year: 1999,
    seasons: "Ongoing",
    rating: "TV-14",
    cast: ["Mayumi Tanaka", "Kazuya Nakai"],
    language: "Japanese",
    imdbScore: 8.9,
    awards: ["Anime Awards"],
    duration: "24 min per episode",
    availability: "Global",
    ratingScore: function () {
      return this.rating + " / " + this.imdbScore;
    }
  },
  attackOnTitan: {
    title: "Attack on Titan",
    category: "Anime",
    year: 2013,
    seasons: 4,
    rating: "TV-MA",
    cast: ["Yuki Kaji", "Marina Inoue"],
    language: "Japanese",
    imdbScore: 9.0,
    awards: ["Anime Awards"],
    duration: "24 min per episode",
    availability: "Global",
    ratingScore: function () {
      return this.rating + " / " + this.imdbScore;
    }
  }
};

  return netflixShows;
}
