import React, { useEffect, useState } from "react";
import "./Display.css";
import { Card, Icon, Image, Grid } from "semantic-ui-react";

function CardExampleCard() {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      fetch("/display", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          console.log("yaha hua");
          console.log(json);
          setData(json);
        });
    }

    fetchData();
  }, []);

  return (
    <div className="Cardall">
      {data.map((curr) => {
        return (
          <Card className="Card">
            <Image src="/images/avatar/large/matthew.png" wrapped ui={false} />
            <Card.Content>
              <Card.Header>{curr.first_name}</Card.Header>
              <Card.Meta>
                <span className="date">Joined in 2015</span>
              </Card.Meta>
              <Card.Description>{curr.last_name}</Card.Description>
            </Card.Content>
            <Card.Content extra>
              <a>
                <Icon name="user" />
                {curr.email}
              </a>
            </Card.Content>
          </Card>
        );
      })}
    </div>
  );
}

export default CardExampleCard;
