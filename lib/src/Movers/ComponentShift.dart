part of ThreeDart.Movers;

/// A simple single component for shifting and smoothing movement.
class ComponentShift extends Events.Changable {
  bool _wrap;
  double _maxLoc;
  double _minLoc;
  double _loc;
  double _maxVel;
  double _vel;
  double _acc;
  double _velDamp;
  Events.Event _changed;

  /// Creates a new [ComponentShift] instance.
  ComponentShift() {
    this._wrap    = true;
    this._maxLoc  = 1.0e12;
    this._minLoc  = -1.0e12;
    this._loc     = 0.0;
    this._maxVel  = 100.0;
    this._vel     = 0.0;
    this._velDamp = 0.0;
    this._acc     = 0.0;
    this._changed = null;
  }

  /// Clamps or wraps the given location to the given minimum and maximum range.
  double _clapWrap(double loc) {
    if (this._wrap) return Math.wrapVal(loc, this._minLoc, this._maxLoc);
    else return Math.clampVal(loc, this._minLoc, this._maxLoc);
  }

  /// Emits when the component has changed.
  Events.Event get changed {
    this._changed ??= new Events.Event();
    return this._changed;
  }

  /// Handles emitting a change.
  void _onChanged([Events.EventArgs args = null]) {
    this._changed?.emit(args);
  }

  /// True to wrap the location around the maximum and minimum values,
  /// false to clap to the maximum and minimum values.
  bool get warp => this._wrap;
  void set wrap(bool wrap) {
    wrap = wrap ?? true;
    if (this._wrap != wrap) {
      bool prev = this._wrap;
      this._wrap = wrap;
      this._onChanged(new Events.ValueChangedEventArgs(this, "warp", prev, this._wrap));
    }
  }

  /// The maximum allowed location.
  double get maximumLocation => this._maxLoc;
  void set maximumLocation(double max) {
    max = max ?? 1.0e12;
    if (!Math.Comparer.equals(this._maxLoc, max)) {
      double prev = this._maxLoc;
      this._maxLoc = max;
      if (this._maxLoc < this._minLoc) {
        this._minLoc = this._maxLoc;
        this._loc = this._maxLoc;
      } else if (this._maxLoc < this._loc)
        this._loc = this._clapWrap(this._loc);
      this._onChanged(new Events.ValueChangedEventArgs(this, "maximumLocation", prev, this._maxLoc));
    }
  }

  /// The minimum allowed location.
  double get minimumLocation => this._minLoc;
  void set minimumLocation(double min) {
    min = min ?? -1.0e12;
    if (!Math.Comparer.equals(this._minLoc, min)) {
      double prev = this._minLoc;
      this._minLoc = min;
      if (this._maxLoc < this._minLoc) {
        this._maxLoc = this._minLoc;
        this._loc = this._minLoc;
      } else if (this._minLoc > this._loc)
        this._loc = this._clapWrap(this._loc);
      this._onChanged(new Events.ValueChangedEventArgs(this, "minimumLocation", prev, this._minLoc));
    }
  }

  /// The location which is the component being shifted.
  double get location => this._loc;
  void set location(double loc) {
    loc = this._clapWrap(loc ?? 0.0);
    if (!Math.Comparer.equals(this._loc, loc)) {
      double prev = this._loc;
      this._loc = loc;
      this._onChanged(new Events.ValueChangedEventArgs(this, "location", prev, this._loc));
    }
  }

  /// The maximum allowed velocity.
  /// The minimum allowed velocity is the negation of this value.
  double get maximumVelocity => this._maxVel;
  void set maximumVelocity(double max) {
    max = max ?? 100.0;
    if (!Math.Comparer.equals(this._maxVel, max)) {
      double prev = this._maxVel;
      this._maxVel = max;
      if (this._maxVel < 0.0) {
        this._maxVel = 0.0;
        this._vel = 0.0;
      } else this._vel = Math.clampVal(this._vel, -this._maxVel, this._maxVel);
      this._onChanged(new Events.ValueChangedEventArgs(this, "maximumVelocity", prev, this._maxVel));
    }
  }

  /// The velocity of the component.
  double get velocity => this._vel;
  void set velocity(double vel) {
    vel = Math.clampVal(vel ?? 0.0, -this._maxVel, this._maxVel);
    if (!Math.Comparer.equals(this._vel, vel)) {
      double prev = this._vel;
      this._vel = vel;
      this._onChanged(new Events.ValueChangedEventArgs(this, "velocity", prev, this._vel));
    }
  }

  /// The acceleration of the component.
  double get acceleration => this._acc;
  void set acceleration(double acc) {
    if (!Math.Comparer.equals(this._acc, acc)) {
      double prev = this._acc;
      this._acc = acc;
      this._onChanged(new Events.ValueChangedEventArgs(this, "acceleration", prev, this._acc));
    }
  }

  /// The amount of dampening applied to the velocity.
  ///
  /// 0 means no dampening to slow down the velocity,
  /// 1 means total dampening to apply no velocity.
  double get dampening => this._velDamp;
  void set dampening(double dampening) {
    dampening = Math.clampVal(dampening ?? 0.0);
    if (!Math.Comparer.equals(this._velDamp, dampening)) {
      double prev = this._velDamp;
      this._velDamp = dampening;
      this._onChanged(new Events.ValueChangedEventArgs(this, "dampening", prev, this._velDamp));
    }
  }

  /// Update the component with the given change in time, [dt].
  void update(double dt) {
    if (!Math.Comparer.equals(this._vel, 0.0) || !Math.Comparer.equals(this._acc, 0.0)) {
      double vel = this._vel + this._acc*dt;
      vel = Math.clampVal(vel, -this._maxVel, this._maxVel);
      this.location = this._loc + vel*dt;
      if (!Math.Comparer.equals(this._velDamp, 0.0)) {
        double act = vel * math.pow(1.0 - this._velDamp, dt);
        if (vel < 0.0) act = Math.clampVal(act, vel, 0.0);
        else           act = Math.clampVal(act, 0.0, vel);
        vel = act;
      }
      this.velocity = vel;
    }
  }
}
