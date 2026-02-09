import Array "mo:core/Array";
import Map "mo:core/Map";
import Order "mo:core/Order";
import Text "mo:core/Text";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type UserProfile = {
    name : Text;
    lastPlayed : ?Int;
  };

  type Agency = {
    name : Text;
    description : Text;
  };

  module Agency {
    public func compare(agency1 : Agency, agency2 : Agency) : Order.Order {
      Text.compare(agency1.name, agency2.name);
    };
  };

  type AgencySelection = {
    selectedAgency : Text;
    isCustom : Bool;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();
  let predefinedAgencies = Map.empty<Text, Agency>();
  let customAgencies = Map.empty<Principal, Agency>();
  let playerSelections = Map.empty<Principal, AgencySelection>();

  // Initialize with some predefined agencies
  let initialAgencies : [Agency] = [
    { name = "Stellar Talent"; description = "Top-tier talents for every occasion." },
    { name = "Galaxy Stars"; description = "Shining stars in the entertainment universe." },
    { name = "Nova Creations"; description = "Innovative and creative talent solutions." },
  ];

  for (agency in initialAgencies.values()) {
    predefinedAgencies.add(agency.name, agency);
  };

  // User Profile Management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Agency Management
  public query ({ caller }) func getAllAgencies() : async [Agency] {
    // Public access - anyone can browse agencies (including guests)
    let predefined = predefinedAgencies.values().toArray();
    let custom = customAgencies.values().toArray();
    predefined.concat(custom);
  };

  public shared ({ caller }) func createCustomAgency(name : Text, description : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create custom agencies");
    };

    let agency : Agency = {
      name;
      description;
    };
    customAgencies.add(caller, agency);

    let selection : AgencySelection = {
      selectedAgency = name;
      isCustom = true;
    };
    playerSelections.add(caller, selection);
  };

  public shared ({ caller }) func selectPredefinedAgency(agencyName : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can select agencies");
    };

    switch (predefinedAgencies.get(agencyName)) {
      case (null) { Runtime.trap("Agency not found") };
      case (?_) {
        let selection : AgencySelection = {
          selectedAgency = agencyName;
          isCustom = false;
        };
        playerSelections.add(caller, selection);
      };
    };
  };

  public query ({ caller }) func getCallerAgencySelection() : async ?AgencySelection {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view their agency selection");
    };
    playerSelections.get(caller);
  };
};
