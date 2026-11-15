import { Component, type ReactNode } from "react";

/** If WebGL fails (old GPU, blocked context), show the CSS fallback instead of a blank hero. */
export default class SceneBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}
