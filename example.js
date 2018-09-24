var exampleNodes = [
  {
    "name": "Node A",
    "id": "id1",
    "group": 1
  },
  {
    "name": "Node B",
    "id": "id2",
    "group": 2
  },
  {
    "name": "Node C",
    "id": "id3",
    "group": 2
  },
  {
    "name": "Node D",
    "id": "id4",
    "group": 3
  },
  {
    "name": "Node E",
    "id": "id5",
    "group": 3
  },
  {
    "name": "Node F",
    "id": "id6",
    "group": 3
  }
];
var exampleLinks = [
  {
    "source": 0,
    "target": 2,
    "value": 1
  },
  {
    "source": 0,
    "target": 1,
    "value": 1
  },
  {
    "source": 0,
    "target": 3,
    "value": 1
  },
  {
    "source": 0,
    "target": 5,
    "value": 1
  },
  {
    "source": 0,
    "target": 4,
    "value": 1
  },
  {
    "source": 2,
    "target": 3,
    "value": 1
  }
];
document.getElementById("nodes").value =  JSON.stringify(exampleNodes, null, 2);
document.getElementById("links").value = JSON.stringify(exampleLinks, null, 2);