function skillsMember(){
    var skills = ['React', 'Node', 'Python', 'Django', 'HTML', 'CSS', 'JS'];
    var skillsList = '';
    for (var i = 0; i < skills.length; i++){
        skillsList += '<li>' + skills[i] + '</li>';
    }
    document.getElementById('skills').innerHTML = skillsList;
}