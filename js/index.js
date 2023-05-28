const conexion=()=>{
    const req = new XMLHttpRequest();
    req.open("GET",'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json', true);
    req.send();
    req.onload=()=>{
        const json = JSON.parse(req.responseText)
        const width=600;
        const height=500;
        const padding=120;
        const xScale=d3.scaleLinear()
                     .domain([d3.min(json,d=>d.Year)-1,d3.max(json,d=>d.Year)+1])
                     .range([0,width-padding])
        const yScale=d3.scaleLinear() 
                     .domain([d3.min(json,d=>parseFloat(d.Time.replace(":","."))),d3.max(json,d=>parseFloat(d.Time.replace(":",".")))]) 
                     .range([height-padding,0]);
        const xAxis=d3.axisBottom(xScale)    
        const yAxis=d3.axisLeft(yScale)         
        const svg=d3.select("body")
                  .append("svg")
                  .attr('width',width)
                  .attr('height',height) 
                 
                  .append("g")
                  .attr("transform", "translate( " + padding/2 + "," + padding/2 + " )")
                svg.append('text')
                .attr('id','title')
                .text(`Dopaje en el ciclismo profesional
                35 tiempos más rápidos en Alpe d'Huez`)
              
       svg.append('g').attr("transform", "translate( 0," + (height-padding) + " )")
      .call(xAxis)
       svg.append('g').call(yAxis);
        svg.selectAll("circle")
              .data(json)
              .enter()
              .append("circle")
              .attr("cx", (d) => xScale(d.Year))
              .attr("cy",(d)=>yScale(parseFloat(d.Time.replace(":","."))))
              .attr("r",(d)=>5)
              .attr("data-xvalue",(d)=>d.Year)
              .attr("class","dot")
              .attr("fill",(d)=>parseFloat(d.Time.replace(":","."))<39?"#D8ED61":"#ED6255")
              .style("border","solid black")
              .append("title")
              .text((d)=>`
               time : ${d.Time} 
               Place :${d.Place}
               second:${d.Seconds}
               Name:${d.Name}
               Year:${d.Year}
               Nationality:${d.Nationality}
               Doping:${d.Doping}

              `)
              .style('color','#A93EED')
              .attr("id","legend")
              .attr("id","tooltip")
              console.log(json[0].Seconds)
              console.log(d3.max(json,d=>parseFloat(d.Time.replace(":","."))))

    }

}
conexion()