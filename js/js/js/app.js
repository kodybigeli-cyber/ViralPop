// ----------------- Bouton Rejoindre -----------------
function joinAlert() {
  alert("ViralPop arrive très bientôt 🚀");
}

// ----------------- Partage sur réseaux sociaux -----------------
function shareSocial(platform) {
  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent("Regarde mon contenu sur ViralPop ! 🚀");
  
  let shareUrl = "";
  switch(platform) {
    case 'whatsapp':
      shareUrl = `https://api.whatsapp.com/send?text=${text}%20${url}`;
      break;
    case 'facebook':
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
      break;
    case 'twitter':
      shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
      break;
  }
  window.open(shareUrl, "_blank");
}

// ----------------- Publication de photos/vidéos (simulation) -----------------
let userContent = []; // tableau pour stocker le contenu localement

function publishContent() {
  const fileInput = document.getElementById('fileInput');
  if(fileInput.files.length > 0){
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = function(e){
      userContent.push({
        name: file.name,
        type: file.type,
        data: e.target.result
      });
      alert("Contenu publié avec succès !");
      updateProgress(); // Met à jour la progression
    }
    reader.readAsDataURL(file);
  } else {
    alert("Sélectionne un fichier d'abord !");
  }
}

// ----------------- Tableau de progression -----------------
function updateProgress(){
  const progressDiv = document.getElementById('progress');
  progressDiv.innerHTML = "";
  userContent.forEach((c, i) => {
    let item = document.createElement('div');
    item.innerHTML = `${i+1}. ${c.name} (${c.type})`;
    progressDiv.appendChild(item);
  });
}

// ----------------- Graphique et jauge en temps réel -----------------
const ctxChart = document.getElementById('popularityChart').getContext('2d');
const popularityChart = new Chart(ctxChart, {
  type: 'line',
  data: {
    labels: Array.from({length: 20}, (_, i) => i+1),
    datasets: [{
      label: 'Popularité',
      data: Array.from({length: 20}, () => Math.floor(Math.random()*100)),
      borderColor: '#ffffff',
      backgroundColor: 'rgba(255,255,255,0.2)',
      fill: true,
      tension: 0.4
    }]
  },
  options: {
    responsive: true,
    plugins: { legend: { labels: { color: '#ffffff' } } },
    scales: { x: { ticks: { color: '#ffffff' } }, y: { ticks: { color: '#ffffff', beginAtZero:true } } }
  }
});

const ctxGauge = document.getElementById('popularityGauge').getContext('2d');
let gaugeValue = Math.floor(Math.random()*100);
const popularityGauge = new Chart(ctxGauge, {
  type: 'doughnut',
  data: {
    labels: ['Niveau de popularité',''],
    datasets:[{data:[gaugeValue,100-gaugeValue],backgroundColor:['#ffffff','rgba(255,255,255,0.2)'],borderWidth:0}]
  },
  options:{rotation:-90,circumference:180,plugins:{legend:{display:false},tooltip:{enabled:false}}}
});

setInterval(()=>{
  // Courbe
  popularityChart.data.datasets[0].data.shift();
  popularityChart.data.datasets[0].data.push(Math.floor(Math.random()*100));
  popularityChart.update();

  // Jauge
  gaugeValue = Math.floor(Math.random()*100);
  popularityGauge.data.datasets[0].data[0] = gaugeValue;
  popularityGauge.data.datasets[0].data[1] = 100-gaugeValue;
  popularityGauge.update();
},3000);
