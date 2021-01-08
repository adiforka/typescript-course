interface Artist {
  works: { title: string }[];
}

interface Citizen {
  votes: { candidate: string }[];
}
type Combinable = Artist | Citizen;

const proc = (val: Combinable) => {
  if ("works" in val) {
    console.log("yay  ");
  } else if ("votes" in val) {
    console.log("always");
  }
};

proc({
  works: [{ title: "a vase in the morning" }, { title: "still nature" }],
});

proc({ votes: [{ candidate: "Jimmy Houston" }, { candidate: "Vivica Fox" }] });
