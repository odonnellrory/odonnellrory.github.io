function sortProjects(order) {
    const projectsContainer = document.getElementById('projects');
    const projectCards = Array.from(projectsContainer.querySelectorAll('.project-card'));

    projectCards.sort((card1, card2) => {
        const order1 = parseInt(card1.dataset.order);
        const order2 = parseInt(card2.dataset.order);

        if (order === 'asc') {
            return order1 - order2;
        } else if (order === 'desc') {
            return order2 - order1;
        }
    });

    // Detach all project cards from the container
    projectCards.forEach(card => projectsContainer.removeChild(card));

    // Reattach sorted project cards to the container
    projectCards.forEach(card => projectsContainer.appendChild(card));
}
