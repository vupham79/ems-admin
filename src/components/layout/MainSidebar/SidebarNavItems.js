import React from "react";
import { Nav } from "shards-react";

import SidebarNavItem from "./SidebarNavItem";

class SidebarNavItems extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      navItems: [
        {
          title: "Company",
          htmlBefore: '<i class="material-icons">vertical_split</i>',
          to: "/company"
        },
        {
          title: "Statistic",
          to: "/statistic",
          htmlBefore: '<i class="material-icons">edit</i>'
        },
        {
          title: "Share Account",
          htmlBefore: '<i class="material-icons">note_add</i>',
          to: "/shareAccount"
        },
        {
          title: "Shareholder",
          htmlBefore: '<i class="material-icons">view_module</i>',
          to: "/shareholder"
        },
        {
          title: "Round",
          htmlBefore: '<i class="material-icons">table_chart</i>',
          to: "/round"
        },
        {
          title: "Transaction",
          htmlBefore: '<i class="material-icons">person</i>',
          to: "/transaction"
        },
        {
          title: "Share Type",
          htmlBefore: '<i class="material-icons">error</i>',
          to: "/shareType"
        }
      ]
    };
  }

  render() {
    const { navItems: items } = this.state;
    return (
      <div className="nav-wrapper">
        <Nav className="nav--no-borders flex-column">
          {items.map((item, idx) => (
            <SidebarNavItem key={idx} item={item} />
          ))}
        </Nav>
      </div>
    );
  }
}

export default SidebarNavItems;
