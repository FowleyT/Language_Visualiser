const inputValue = document.querySelector("#search");
const searchButton = document.querySelector(".searchButton");
const nameContainer = document.querySelector(".main__profile-name");
const unContainer = document.querySelector(".main__profile-username");
const reposContainer = document.querySelector(".main__profile-repos");
const urlContainer = document.querySelector(".main__profile-url");
const reposListContainer = document.querySelector(".main__profile-repolist");
const languageContainer = document.querySelector(".large-7 medium-7 small-12 columns");



const getUsers = async (user) => {
  const api_call = await fetch(`https://api.github.com/users/${user}`);

  const data = await api_call.json();
  return {data}
};

const getRepos = async (user) => {
  const api_call = await fetch(`https://api.github.com/users/${user}/repos`);

  const repos = await api_call.json();
  return {data : repos}
};




const showData =  () => {
  getUsers(inputValue.value).then((response) => {
   //console.log(response);

    nameContainer.innerHTML =`Name: <span class="main__profile-value"> ${response.data.name} </span>`;
    unContainer.innerHTML =`Username: <span class="main__profile-value"> ${response.data.login} </span>`;
    reposContainer.innerHTML =`Repos: <span class="main__profile-value"> ${response.data.public_repos} </span>`;
    urlContainer.innerHTML =`URL: <span class="main__profile-value"> ${response.data.html_url} </span>`;
  })
};

const showRepos = () => {
    getRepos(inputValue.value).then((repos) => {
      //console.log(repos);
      while( reposListContainer.firstChild ){
        reposListContainer.removeChild( reposListContainer.firstChild );
      }
        for (var i = 0; i < repos.data.length; i++) {

              reposListContainer.innerHTML +=`<li class="list-group-item"> ${repos.data[i].name} </li>`;
        }
			});
			}




      function commitHistory(repos){
  	var data =getData(repos.data);
  //	console.log(data);
  	plot(repos);
  }


  function getData(obj){

  	var repos = obj
  	var commits = [];
  	var commit_count =0;
    var returnData=[];

    getRepos(inputValue.value).then((repo) => {
      //console.log(repos);
      for(var i = 0 ; i<repo.data.length;i++)
      {
        returnData.push({"repo_name":repo.data[i].name, "commits":repo.data[i].size});
      }
      });


  //	console.log(repos.data.length);



  	console.log(returnData);
  	return returnData;
  }

  function plot(data){
  	var names=[];
  	var	commits=[];
  	//console.log(data[1].repo_name);
  //  console.log(data.Length);


  for(var i = 0 ; i<data.data.length ; i ++)
  {
    names[i]= data.data[i].name;
    commits[i]=data.data[i].size;
  }


  	console.log(names[0]);

           var width = 400;
  		 var height = 400;


  	//	console.log(data);
           var svg = d3.select("svg"),
              width = svg.attr("width"),
              height = svg.attr("height"),
              radius = Math.min(width, height) / 2;

           var g = svg.append("g")
              .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

           var color = d3.scaleOrdinal([
              'gray', 'green', 'brown', 'orange', 'yellow', 'red', 'purple'
           ]);

           var pie = d3.pie().value(function(d) {
              return d.commits;
           });

           var path = d3.arc()
              .outerRadius(radius - 10).innerRadius(0);

           var label = d3.arc()
              .outerRadius(radius).innerRadius(radius - 80);

           var arcAttrs = {
            cx: function(d) { return xScale(d.x); },
            cy: function(d) { return yScale(d.y); }
  		 };

              var arc = g.selectAll(".arc")
                 .data(pie(data))
                 .enter()
                 .append("g")
                 .attr("class", "arc",arcAttrs)
  			   .on("mouseover", handleMouseOver)
  			   .on("mouseout", handleMouseOut);

              arc.append("path")
                 .attr("d", path)
                 .attr("fill", function(d) { return color(d.data.repo_name); });

          //    console.log(arc)

  }

  function handleMouseOver(d, i) {  // Add interactivity

      var svg = d3.select("g")
      //console.log(svg);
           // Use D3 to select element, change color and size
           d3.select(this).attr({

           });
     document.getElementById("arc").innerHTML = d.data.repo_name + " commits: " + d.data.commits;

         }

     function handleMouseOut(d, i) {
           // Use D3 to select element, change color back to normal
           d3.select(this).attr({

           });

           // Select text by id and then remove
           d3.select("#t" + d.x + "-" + d.y + "-" + i).remove();  // Remove text location
         }


searchButton.addEventListener("click", () => {

  showData();
  showRepos();
  commitHistory(getRepos(inputValue.value));



})
