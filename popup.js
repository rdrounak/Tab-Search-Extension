document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.getElementById('searchInput')
  const tabList = document.getElementById('tabList')

  // Function to update the displayed tabs based on search input
  function updateTabs() {
    const query = searchInput.value.toLowerCase()

    chrome.tabs.query({}, function (tabs) {
      const filteredTabs = tabs.filter((tab) =>
        tab.title.toLowerCase().includes(query)
      )

      // Clear the existing tab list
      tabList.innerHTML = ''

      // Populate the tab list with the filtered tabs
      filteredTabs.forEach((tab) => {
        const li = document.createElement('li')

        // Create elements for tab title and URL info
        const titleDiv = document.createElement('div')
        titleDiv.classList.add('tab-title')
        titleDiv.textContent = tab.title

        const urlInfoDiv = document.createElement('div')
        urlInfoDiv.classList.add('tab-info')

        urlInfoDiv.textContent = new URL(tab.url).pathname

        // Add title and URL info to the list item
        li.appendChild(titleDiv)
        li.appendChild(urlInfoDiv)

        // Add click event to switch to the selected tab
        li.addEventListener('click', function () {
          chrome.tabs.update(tab.id, { active: true })
          window.close()
        })

        // Add the list item to the tab list
        tabList.appendChild(li)
      })
    })
  }

  // Event listener for search input changes
  searchInput.addEventListener('input', updateTabs)

  // Initial tab update
  updateTabs()
})
